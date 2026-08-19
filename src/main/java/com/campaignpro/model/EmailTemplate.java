package com.campaignpro.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Document(collection = "email_templates")
public class EmailTemplate {

    @Id
    private String id;

    private String userId;

    private String name;

    private String subject;

    private String htmlContent;

    private List<String> placeholders = new ArrayList<>();

    private LocalDateTime createdAt;

    private LocalDateTime updatedAt;

    public EmailTemplate() {
    }

    public EmailTemplate(String id, String userId, String name,
                         String subject, String htmlContent,
                         List<String> placeholders, LocalDateTime createdAt,
                         LocalDateTime updatedAt) {
        this.id = id;
        this.userId = userId;
        this.name = name;
        this.subject = subject;
        this.htmlContent = htmlContent;
        this.placeholders = placeholders;
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

    public String getHtmlContent() {
        return htmlContent;
    }

    public void setHtmlContent(String htmlContent) {
        this.htmlContent = htmlContent;
    }

    public List<String> getPlaceholders() {
        return placeholders;
    }

    public void setPlaceholders(List<String> placeholders) {
        this.placeholders = placeholders;
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