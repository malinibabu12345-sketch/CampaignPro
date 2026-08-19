package com.campaignpro.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;

@Document(collection = "campaigns")
public class Campaign {

    @Id
    private String id;

    private String userId;

    private String name;

    private String subject;

    private String templateId;

    private String status;

    private LocalDateTime scheduledAt;

    private LocalDateTime sentAt;

    private int totalRecipients;

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public Campaign() {
    }

    public Campaign(String id, String userId, String name,
                    String subject, String templateId, String status,
                    LocalDateTime scheduledAt, LocalDateTime sentAt,
                    int totalRecipients, LocalDateTime createdAt,
                    LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.subject = subject;
        this.templateId = templateId;
        this.status = status;
        this.scheduledAt = scheduledAt;
        this.sentAt = sentAt;
        this.totalRecipients = totalRecipients;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getUserId() {
        return userId;
    }

    public void setUserId(String userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSubject() {
        return subject;
    }

    public void setSubject(String subject) {
        this.subject = subject;
    }

    public String getTemplateId() {
        return templateId;
    }

    public void setTemplateId(String templateId) {
        this.templateId = templateId;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public LocalDateTime getScheduledAt() {
        return scheduledAt;
    }

    public void setScheduledAt(LocalDateTime scheduledAt) {
        this.scheduledAt = scheduledAt;
    }

    public LocalDateTime getSentAt() {
        return sentAt;
    }

    public void setSentAt(LocalDateTime sentAt) {
        this.sentAt = sentAt;
    }

    public int getTotalRecipients() {
        return totalRecipients;
    }

    public void setTotalRecipients(int totalRecipients) {
        this.totalRecipients = totalRecipients;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }

    public LocalDateTime getUpdatedAt() {
        return updatedAt;
    }

    public void setUpdatedAt(LocalDateTime updatedAt) {
        this.updatedAt = updatedAt;
    }
}