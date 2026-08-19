package com.campaignpro.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "campaign_recipients")
public class CampaignRecipient {

    @Id
    private String id;

    private String campaignId;

    private String contactId;

    private String email;

    private String status;

    private int retryCount;

    private LocalDateTime deliveredAt;

    private LocalDateTime openedAt;

    private LocalDateTime clickedAt;

    public CampaignRecipient() {
    }

    public CampaignRecipient(String id, String campaignId, String contactId,
                             String email, String status, int retryCount,
                             LocalDateTime deliveredAt, LocalDateTime openedAt,
                             LocalDateTime clickedAt) {
        this.id = id;
        this.campaignId = campaignId;
        this.contactId = contactId;
        this.email = email;
        this.status = status;
        this.retryCount = retryCount;
        this.deliveredAt = deliveredAt;
        this.openedAt = openedAt;
        this.clickedAt = clickedAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getCampaignId() {
        return campaignId;
    }

    public void setCampaignId(String campaignId) {
        this.campaignId = campaignId;
    }

    public String getContactId() {
        return contactId;
    }

    public void setContactId(String contactId) {
        this.contactId = contactId;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public int getRetryCount() {
        return retryCount;
    }

    public void setRetryCount(int retryCount) {
        this.retryCount = retryCount;
    }

    public LocalDateTime getDeliveredAt() {
        return deliveredAt;
    }

    public void setDeliveredAt(LocalDateTime deliveredAt) {
        this.deliveredAt = deliveredAt;
    }

    public LocalDateTime getOpenedAt() {
        return openedAt;
    }

    public void setOpenedAt(LocalDateTime openedAt) {
        this.openedAt = openedAt;
    }

    public LocalDateTime getClickedAt() {
        return clickedAt;
    }

    public void setClickedAt(LocalDateTime clickedAt) {
        this.clickedAt = clickedAt;
    }
}