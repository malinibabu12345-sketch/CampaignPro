package com.campaignpro.dto;

import jakarta.validation.constraints.NotBlank;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

public class CampaignRequest {

    @NotBlank(message = "Campaign name is required")
    private String name;

    @NotBlank(message = "Subject is required")
    private String subject;

    @NotBlank(message = "Template ID is required")
    private String templateId;

    private List<String> contactIds = new ArrayList<>();

    private String status;

    private LocalDateTime scheduledAt;

    public CampaignRequest() {
    }

    public CampaignRequest(String name, String subject, String templateId,
                           List<String> contactIds, String status,
                           LocalDateTime scheduledAt) {
        this.name = name;
        this.subject = subject;
        this.templateId = templateId;
        this.contactIds = contactIds;
        this.status = status;
        this.scheduledAt = scheduledAt;
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

    public List<String> getContactIds() {
        return contactIds;
    }

    public void setContactIds(List<String> contactIds) {
        this.contactIds = contactIds;
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
}