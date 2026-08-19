package com.campaignpro.dto;

public class TemplatePreviewRequest {

    private String recipientName;

    public TemplatePreviewRequest() {
    }

    public TemplatePreviewRequest(String recipientName) {

        this.recipientName = recipientName;
    }

    public String getRecipientName() {

        return recipientName;
    }

    public void setRecipientName(String recipientName) {

        this.recipientName = recipientName;
    }
}
