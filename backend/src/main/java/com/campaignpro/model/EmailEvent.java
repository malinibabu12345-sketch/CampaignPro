package com.campaignpro.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "email_events")
public class EmailEvent {

    @Id
    private String id;

    private String campaignId;

    private String recipientId;

    private String eventType;

    private LocalDateTime timestamp;

    private String metadata;

    public EmailEvent() {
    }

    public EmailEvent(String id, String campaignId, String recipientId,
                      String eventType, LocalDateTime timestamp, String metadata) {
        this.id = id;
        this.campaignId = campaignId;
        this.recipientId = recipientId;
        this.eventType = eventType;
        this.timestamp = timestamp;
        this.metadata = metadata;
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

    public String getRecipientId() {
        return recipientId;
    }

    public void setRecipientId(String recipientId) {
        this.recipientId = recipientId;
    }

    public String getEventType() {
        return eventType;
    }

    public void setEventType(String eventType) {
        this.eventType = eventType;
    }

    public LocalDateTime getTimestamp() {
        return timestamp;
    }

    public void setTimestamp(LocalDateTime timestamp) {
        this.timestamp = timestamp;
    }

    public String getMetadata() {
        return metadata;
    }

    public void setMetadata(String metadata) {
        this.metadata = metadata;
    }
}