package com.campaignpro.service;

import com.campaignpro.model.CampaignRecipient;
import com.campaignpro.model.EmailEvent;
import com.campaignpro.model.EmailTemplate;
import com.campaignpro.repository.CampaignRecipientRepository;
import com.campaignpro.repository.EmailEventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class EmailService {

    private final CampaignRecipientRepository campaignRecipientRepository;
    private final EmailEventRepository emailEventRepository;

    public EmailService(CampaignRecipientRepository campaignRecipientRepository,
            EmailEventRepository emailEventRepository) {

        this.campaignRecipientRepository = campaignRecipientRepository;
        this.emailEventRepository = emailEventRepository;
    }

    public boolean sendEmail(CampaignRecipient recipient, EmailTemplate template, String recipientName) {

        String subject = template.getSubject();
        String content = template.getHtmlContent();

        if (recipientName != null) {
            subject = subject.replace("{{name}}", recipientName);
            content = content.replace("{{name}}", recipientName);
        }
        System.out.println("=================================");
        System.out.println("CampaignPro Email");
        System.out.println("To: " + recipient.getEmail());
        System.out.println("Subject: " + subject);
        System.out.println("Content: " + content);
        System.out.println("=================================");

        LocalDateTime now = LocalDateTime.now();
        recipient.setStatus("SENT");
        recipient.setRetryCount(0);
        recipient.setDeliveredAt(now);
        campaignRecipientRepository.save(recipient);

        EmailEvent event = new EmailEvent();
        event.setCampaignId(recipient.getCampaignId());
        event.setRecipientId(recipient.getId());
        event.setEventType("DELIVERED");
        event.setTimestamp(now);
        event.setMetadata("Email delivered successfully");
        emailEventRepository.save(event);
        return true;
    }
}
