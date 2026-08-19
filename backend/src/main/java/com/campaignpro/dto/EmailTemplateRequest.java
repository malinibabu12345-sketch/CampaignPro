package com.campaignpro.dto;

import jakarta.validation.constraints.NotBlank;

import java.util.ArrayList;
import java.util.List;

public class EmailTemplateRequest {

    @NotBlank(message = "Template name is required")
    private String name;

    @NotBlank(message = "Subject is required")
    private String subject;

    @NotBlank(message = "Email content is required")
    private String htmlContent;

    private List<String> placeholders = new ArrayList<>();

    public EmailTemplateRequest() {
    }

    public EmailTemplateRequest(String name, String subject, String htmlContent,
                                List<String> placeholders) {
        this.name = name;
        this.subject = subject;
        this.htmlContent = htmlContent;
        this.placeholders = placeholders;
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
}