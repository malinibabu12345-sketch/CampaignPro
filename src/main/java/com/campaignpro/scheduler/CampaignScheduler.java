package com.campaignpro.scheduler;

import com.campaignpro.model.Campaign;
import com.campaignpro.model.CampaignRecipient;
import com.campaignpro.model.Contact;
import com.campaignpro.model.EmailTemplate;
import com.campaignpro.repository.CampaignRecipientRepository;
import com.campaignpro.repository.CampaignRepository;
import com.campaignpro.repository.ContactRepository;
import com.campaignpro.repository.EmailTemplateRepository;
import com.campaignpro.service.EmailService;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.time.LocalDateTime;
import java.util.List;

@Component
public class CampaignScheduler {

    private final CampaignRepository campaignRepository;
    private final CampaignRecipientRepository campaignRecipientRepository;
    private final ContactRepository contactRepository;
    private final EmailTemplateRepository emailTemplateRepository;
    private final EmailService emailService;

    public CampaignScheduler(CampaignRepository campaignRepository,
            CampaignRecipientRepository campaignRecipientRepository,
            ContactRepository contactRepository, EmailTemplateRepository emailTemplateRepository,
            EmailService emailService) {

        this.campaignRepository = campaignRepository;
        this.campaignRecipientRepository = campaignRecipientRepository;
        this.contactRepository = contactRepository;
        this.emailTemplateRepository = emailTemplateRepository;
        this.emailService = emailService;
    }

    @Scheduled(fixedRate = 60000)
    public void processScheduledCampaigns() {

        LocalDateTime now = LocalDateTime.now();
        List<Campaign> campaigns = campaignRepository.
                findByStatusAndScheduledAtLessThanEqual("SCHEDULED", now);

        for (Campaign campaign : campaigns) {
            campaign.setStatus("SENDING");
            campaign.setUpdatedAt(now);
            campaignRepository.save(campaign);
            EmailTemplate template = emailTemplateRepository.findById(
                    campaign.getTemplateId()).orElse(null);

            if (template == null) {
                System.out.println("Email template not found for campaign: " + campaign.getId());
                continue;
            }
            List<CampaignRecipient> recipients = campaignRecipientRepository
                            .findByCampaignId(campaign.getId());

            for (CampaignRecipient recipient : recipients) {

                try {
                    Contact contact = contactRepository.findById(
                            recipient.getContactId()).orElse(null);
                    String recipientName = "Customer";
                    if (contact != null) {
                        recipientName = contact.getName();
                    }
                    emailService.sendEmail(recipient, template, recipientName);
                } catch (Exception e) {
                    recipient.setRetryCount(recipient.getRetryCount() + 1);

                    if (recipient.getRetryCount() >= 3) {
                        recipient.setStatus("FAILED");
                    } else {
                        recipient.setStatus("PENDING");
                    }

                    campaignRecipientRepository.save(recipient);
                    System.out.println("Failed to send email to: " +
                            recipient.getEmail() + " Retry count: " +
                            recipient.getRetryCount());
                }
            }

            campaign.setStatus("SENT");
            campaign.setUpdatedAt(LocalDateTime.now());
            campaignRepository.save(campaign);

            System.out.println("Campaign sent successfully: " + campaign.getId());
        }
    }
}