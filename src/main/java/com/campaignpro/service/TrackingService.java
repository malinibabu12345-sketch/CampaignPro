package com.campaignpro.service;

import com.campaignpro.exception.ResourceNotFoundException;
import com.campaignpro.model.CampaignRecipient;
import com.campaignpro.model.EmailEvent;
import com.campaignpro.repository.CampaignRecipientRepository;
import com.campaignpro.repository.EmailEventRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class TrackingService {
    private final CampaignRecipientRepository campaignRecipientRepository;
    private final EmailEventRepository emailEventRepository;

    public TrackingService(CampaignRecipientRepository campaignRecipientRepository,
            EmailEventRepository emailEventRepository) {

        this.campaignRecipientRepository = campaignRecipientRepository;
        this.emailEventRepository = emailEventRepository;
    }

    public void trackOpen(String recipientId) {
        CampaignRecipient recipient = campaignRecipientRepository.findById
                (recipientId).orElseThrow(() -> new ResourceNotFoundException
                ("Campaign recipient not found"));
        LocalDateTime now = LocalDateTime.now();
        recipient.setOpenedAt(now);

        campaignRecipientRepository.save(recipient);
        EmailEvent event = new EmailEvent();
        event.setCampaignId(recipient.getCampaignId());
        event.setRecipientId(recipient.getId());
        event.setEventType("OPENED");
        event.setTimestamp(now);
        event.setMetadata("Email opened");

        emailEventRepository.save(event);
    }

    public void trackClick(String recipientId) {
        CampaignRecipient recipient = campaignRecipientRepository.
                findById(recipientId).orElseThrow(() -> new ResourceNotFoundException("Campaign recipient not found"));

        LocalDateTime now = LocalDateTime.now();
        recipient.setClickedAt(now);
        campaignRecipientRepository.save(recipient);
        EmailEvent event = new EmailEvent();

        event.setCampaignId(recipient.getCampaignId());
        event.setRecipientId(recipient.getId());
        event.setEventType("CLICKED");
        event.setTimestamp(now);
        event.setMetadata("Email link clicked");
        emailEventRepository.save(event);
    }
}