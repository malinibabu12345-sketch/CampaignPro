package com.campaignpro.service;

import com.campaignpro.dto.EmailTemplateRequest;
import com.campaignpro.dto.TemplatePreviewRequest;
import com.campaignpro.exception.ResourceNotFoundException;
import com.campaignpro.model.EmailTemplate;
import com.campaignpro.repository.EmailTemplateRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class EmailTemplateService {

    private final EmailTemplateRepository emailTemplateRepository;

    public EmailTemplateService(EmailTemplateRepository emailTemplateRepository) {

        this.emailTemplateRepository = emailTemplateRepository;
    }

    public EmailTemplate createTemplate(String userId, EmailTemplateRequest request) {

        EmailTemplate template = new EmailTemplate();
        template.setUserId(userId);
        template.setName(request.getName());
        template.setSubject(request.getSubject());
        template.setHtmlContent(request.getHtmlContent());
        template.setPlaceholders(request.getPlaceholders());

        LocalDateTime now = LocalDateTime.now();
        template.setCreatedAt(now);
        template.setUpdatedAt(now);
        return emailTemplateRepository.save(template);
    }

    public List<EmailTemplate> getAllTemplates(String userId) {
        return emailTemplateRepository.findByUserId(userId);
    }

    public EmailTemplate getTemplateById(String userId, String templateId) {
        EmailTemplate template = emailTemplateRepository.findById(templateId)
                .orElseThrow(() -> new ResourceNotFoundException("Email template not found"));

        if (!template.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Email template not found");
        }
        return template;
    }

    public EmailTemplate updateTemplate(String userId, String templateId,
            EmailTemplateRequest request) {
        EmailTemplate template = getTemplateById(userId, templateId);

        template.setName(request.getName());
        template.setSubject(request.getSubject());
        template.setHtmlContent(request.getHtmlContent());
        template.setPlaceholders(request.getPlaceholders());
        template.setUpdatedAt(LocalDateTime.now());

        return emailTemplateRepository.save(template);
    }
    public void deleteTemplate(String userId, String templateId) {
        EmailTemplate template = getTemplateById(userId, templateId);
        emailTemplateRepository.delete(template);
    }

    public List<EmailTemplate> searchTemplates(String userId, String name) {
        return emailTemplateRepository.findByUserIdAndNameContainingIgnoreCase(userId, name);
    }
    public EmailTemplate previewTemplate(String userId,
            String templateId, TemplatePreviewRequest request) {

        EmailTemplate template = getTemplateById(userId, templateId);
        String recipientName = request.getRecipientName();
        if (recipientName == null || recipientName.isBlank()) {
            recipientName = "Customer";
        }

        String subject = template.getSubject().replace("{{name}}", recipientName);
        String htmlContent = template.getHtmlContent().replace("{{name}}",
                recipientName);
        EmailTemplate preview = new EmailTemplate();

        preview.setId(template.getId());
        preview.setUserId(template.getUserId());
        preview.setName(template.getName());
        preview.setSubject(subject);
        preview.setHtmlContent(htmlContent);
        preview.setPlaceholders(template.getPlaceholders());
        preview.setCreatedAt(template.getCreatedAt());
        preview.setUpdatedAt(template.getUpdatedAt());
        return preview;
    }
}
