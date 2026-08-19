package com.campaignpro.service;

import com.campaignpro.dto.CampaignRequest;
import com.campaignpro.exception.BadRequestException;
import com.campaignpro.exception.ResourceNotFoundException;
import com.campaignpro.model.Campaign;
import com.campaignpro.model.CampaignRecipient;
import com.campaignpro.model.Contact;
import com.campaignpro.model.EmailTemplate;
import com.campaignpro.repository.CampaignRecipientRepository;
import com.campaignpro.repository.CampaignRepository;
import com.campaignpro.repository.ContactRepository;
import com.campaignpro.repository.EmailTemplateRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
public class CampaignService {

    private final CampaignRepository campaignRepository;
    private final CampaignRecipientRepository campaignRecipientRepository;
    private final ContactRepository contactRepository;
    private final EmailTemplateRepository emailTemplateRepository;
    private final EmailService emailService;

    public CampaignService(CampaignRepository campaignRepository,
            CampaignRecipientRepository campaignRecipientRepository,
            ContactRepository contactRepository, EmailTemplateRepository emailTemplateRepository,
            EmailService emailService) {

        this.campaignRepository = campaignRepository;
        this.campaignRecipientRepository = campaignRecipientRepository;
        this.contactRepository = contactRepository;
        this.emailTemplateRepository = emailTemplateRepository;
        this.emailService = emailService;
    }

    public Campaign createCampaign(String userId, CampaignRequest request) {

        EmailTemplate template = emailTemplateRepository
                .findById(request.getTemplateId()).orElseThrow(() ->
                        new ResourceNotFoundException("Email template not found"));
        if (!template.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Email template not found");
        }

        Campaign campaign = new Campaign();
        campaign.setUserId(userId);
        campaign.setName(request.getName());
        campaign.setSubject(request.getSubject());
        campaign.setTemplateId(request.getTemplateId());
        String status = request.getStatus();
        if (status == null || status.isBlank()) {
            status = "DRAFT";
        }

        campaign.setStatus(status);
        campaign.setScheduledAt(request.getScheduledAt());
        LocalDateTime now = LocalDateTime.now();
        campaign.setCreatedAt(now);
        campaign.setUpdatedAt(now);
        Campaign savedCampaign = campaignRepository.save(campaign);
        createRecipients(savedCampaign, userId, request.getContactIds());

        int recipientCount = campaignRecipientRepository.findByCampaignId
                (savedCampaign.getId()).size();
        savedCampaign.setTotalRecipients(recipientCount);
        return campaignRepository.save(savedCampaign);
    }

    private void createRecipients(Campaign campaign, String userId, List<String> contactIds) {
        if (contactIds == null || contactIds.isEmpty()) {
            return;
        }
        List<CampaignRecipient> recipients = new ArrayList<>();

        for (String contactId : contactIds) {

            Contact contact = contactRepository.findById(contactId).orElseThrow(() ->
                            new ResourceNotFoundException("Contact not found: " + contactId));
            if (!contact.getUserId().equals(userId)) {
                throw new ResourceNotFoundException("Contact not found: " + contactId);
            }
            CampaignRecipient recipient = new CampaignRecipient();

            recipient.setCampaignId(campaign.getId());
            recipient.setContactId(contact.getId());
            recipient.setEmail(contact.getEmail());
            recipient.setStatus("PENDING");
            recipient.setRetryCount(0);
            recipients.add(recipient);
        }

        campaignRecipientRepository.saveAll(recipients);
    }

    public List<Campaign> getAllCampaigns(String userId) {
        return campaignRepository.findByUserId(userId);
    }

    public Campaign getCampaignById(String userId, String campaignId) {
        Campaign campaign =
                campaignRepository.findById(campaignId).orElseThrow(() ->
                                new ResourceNotFoundException("Campaign not found"));
        if (!campaign.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Campaign not found");
        }
        return campaign;
    }

    public Campaign updateCampaign(String userId, String campaignId, CampaignRequest request) {
        Campaign campaign = getCampaignById(userId, campaignId);

        if ("SENT".equals(campaign.getStatus())) {
            throw new BadRequestException("Sent campaign cannot be edited");
        }

        EmailTemplate template = emailTemplateRepository.findById(request.getTemplateId())
                        .orElseThrow(() -> new ResourceNotFoundException("Email template not found"));
        if (!template.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Email template not found");
        }

        campaign.setName(request.getName());
        campaign.setSubject(request.getSubject());
        campaign.setTemplateId(request.getTemplateId());

        if (request.getStatus() != null) {
            campaign.setStatus(request.getStatus());
        }
        campaign.setScheduledAt(request.getScheduledAt());
        campaign.setUpdatedAt(LocalDateTime.now());
        campaignRecipientRepository.deleteAll(campaignRecipientRepository.findByCampaignId(campaignId));
        createRecipients(campaign, userId, request.getContactIds());

        int recipientCount = campaignRecipientRepository.findByCampaignId(campaignId).size();
        campaign.setTotalRecipients(recipientCount);
        return campaignRepository.save(campaign);
    }

    public void deleteCampaign(String userId, String campaignId) {

        Campaign campaign = getCampaignById(userId, campaignId);
        campaignRecipientRepository.deleteAll(campaignRecipientRepository.findByCampaignId(campaignId));
        campaignRepository.delete(campaign);
    }

    public List<CampaignRecipient> getRecipients(String userId, String campaignId) {
        getCampaignById(userId, campaignId);
        return campaignRecipientRepository.findByCampaignId(campaignId);
    }

    public Campaign updateCampaignStatus(String userId, String campaignId, String status) {
        Campaign campaign = getCampaignById(userId, campaignId);
        campaign.setStatus(status);
        campaign.setUpdatedAt(LocalDateTime.now());
        return campaignRepository.save(campaign);
    }

    public void sendCampaign(String userId, String campaignId) {

        Campaign campaign = getCampaignById(userId, campaignId);
        if ("SENT".equals(campaign.getStatus())) {
            throw new BadRequestException("Campaign already sent");
        }
        EmailTemplate template = emailTemplateRepository.findById(campaign.getTemplateId())
                .orElseThrow(() -> new ResourceNotFoundException("Email template not found"));

        if (!template.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Email template not found");
        }
        List<CampaignRecipient> recipients = campaignRecipientRepository.findByCampaignId(campaignId);
        if (recipients.isEmpty()) {
            throw new BadRequestException("Campaign has no recipients");
        }
        campaign.setStatus("SENDING");
        campaign.setUpdatedAt(LocalDateTime.now());
        campaignRepository.save(campaign);

        for (CampaignRecipient recipient : recipients) {

            try {
                Contact contact = contactRepository.findById(recipient.getContactId()).orElse(null);
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
            }
        }

        campaign.setStatus("SENT");
        campaign.setUpdatedAt(LocalDateTime.now());
        campaignRepository.save(campaign);
    }
}