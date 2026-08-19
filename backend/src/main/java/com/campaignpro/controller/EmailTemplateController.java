package com.campaignpro.controller;

import com.campaignpro.dto.EmailTemplateRequest;
import com.campaignpro.dto.TemplatePreviewRequest;
import com.campaignpro.model.EmailTemplate;
import com.campaignpro.service.EmailTemplateService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/templates")
public class EmailTemplateController {

    private final EmailTemplateService emailTemplateService;

    public EmailTemplateController(
            EmailTemplateService emailTemplateService) {
        this.emailTemplateService = emailTemplateService;
    }

    @PostMapping
    public ResponseEntity<EmailTemplate> createTemplate(
            Authentication authentication, @Valid @RequestBody EmailTemplateRequest request) {
        String userId = authentication.getName();

        return ResponseEntity.ok(emailTemplateService.createTemplate(userId, request));
    }

    @GetMapping
    public ResponseEntity<List<EmailTemplate>> getAllTemplates(
            Authentication authentication) {

        String userId = authentication.getName();
        return ResponseEntity.ok(emailTemplateService.getAllTemplates(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<EmailTemplate> getTemplateById(
            Authentication authentication, @PathVariable String id) {

        String userId = authentication.getName();
        return ResponseEntity.ok(emailTemplateService.getTemplateById(userId, id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmailTemplate> updateTemplate(
            Authentication authentication, @PathVariable String id,
            @Valid @RequestBody EmailTemplateRequest request) {
        String userId = authentication.getName();
        return ResponseEntity.ok(emailTemplateService.updateTemplate(userId, id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteTemplate(
            Authentication authentication, @PathVariable String id) {

        String userId = authentication.getName();
        emailTemplateService.deleteTemplate(userId, id);
        return ResponseEntity.ok("Email template deleted successfully");
    }

    @GetMapping("/search")
    public ResponseEntity<List<EmailTemplate>> searchTemplates(
            Authentication authentication, @RequestParam String name) {

        String userId = authentication.getName();
        return ResponseEntity.ok(emailTemplateService.searchTemplates(userId, name));
    }

    @PostMapping("/{id}/preview")
    public ResponseEntity<EmailTemplate> previewTemplate(Authentication authentication,
            @PathVariable String id, @RequestBody TemplatePreviewRequest request) {

        String userId = authentication.getName();
        return ResponseEntity.ok(emailTemplateService.previewTemplate(userId, id, request));
    }
}
