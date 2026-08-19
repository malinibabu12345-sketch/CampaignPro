package com.campaignpro.service;

import com.campaignpro.dto.AnalyticsResponse;
import com.campaignpro.exception.ResourceNotFoundException;
import com.campaignpro.model.Campaign;
import com.campaignpro.model.CampaignRecipient;
import com.campaignpro.repository.CampaignRecipientRepository;
import com.campaignpro.repository.CampaignRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnalyticsService {

    private final CampaignRepository campaignRepository;
    private final CampaignRecipientRepository campaignRecipientRepository;

    public AnalyticsService(CampaignRepository campaignRepository,
            CampaignRecipientRepository campaignRecipientRepository) {

        this.campaignRepository = campaignRepository;
        this.campaignRecipientRepository = campaignRecipientRepository;
    }

    public AnalyticsResponse getCampaignAnalytics(String userId, String campaignId) {
        Campaign campaign = campaignRepository.findById(campaignId)
                .orElseThrow(() -> new ResourceNotFoundException("Campaign not found"));

        if (!campaign.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Campaign not found");
        }
        List<CampaignRecipient> recipients = campaignRecipientRepository
                .findByCampaignId(campaignId);

        long totalEmailsSent = 0;
        long totalDelivered = 0;
        long totalOpened = 0;
        long totalClicked = 0;
        long totalFailed = 0;
        for (CampaignRecipient recipient : recipients) {
            if ("SENT".equals(recipient.getStatus()) || recipient.
                    getDeliveredAt() != null) {
                totalEmailsSent++;
            }
            if (recipient.getDeliveredAt() != null) {
                totalDelivered++;
            }
            if (recipient.getOpenedAt() != null) {
                totalOpened++;
            }
            if (recipient.getClickedAt() != null) {
                totalClicked++;
            }
            if ("FAILED".equals(recipient.getStatus())) {
                totalFailed++;
            }
        }

        double deliveryRate = calculateRate(totalDelivered, totalEmailsSent);
        double openRate = calculateRate(totalOpened, totalEmailsSent);
        double clickRate = calculateRate(totalClicked, totalEmailsSent);

        return new AnalyticsResponse(totalEmailsSent, totalDelivered,
                totalOpened, totalClicked, totalFailed,
                deliveryRate, openRate, clickRate);
    }

    private double calculateRate(long value, long total) {
        if (total == 0) {
            return 0.0;
        }
        return (value * 100.0) / total;
    }
}