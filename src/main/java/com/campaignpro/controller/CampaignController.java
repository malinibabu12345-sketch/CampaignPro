package com.campaignpro.controller;

import com.campaignpro.dto.CampaignRequest;
import com.campaignpro.model.Campaign;
import com.campaignpro.model.CampaignRecipient;
import com.campaignpro.service.CampaignService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/campaigns")
public class CampaignController {

    private final CampaignService campaignService;
    public CampaignController(CampaignService campaignService) {
        this.campaignService = campaignService;
    }

    @PostMapping
    public ResponseEntity<Campaign> createCampaign(
            Authentication authentication, @Valid @RequestBody CampaignRequest request) {
        String userId = authentication.getName();
        return ResponseEntity.ok(
                campaignService.createCampaign(userId, request));
    }

    @GetMapping
    public ResponseEntity<List<Campaign>> getAllCampaigns(
            Authentication authentication) {
        String userId = authentication.getName();
        return ResponseEntity.ok(campaignService.getAllCampaigns(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Campaign> getCampaignById(
            Authentication authentication, @PathVariable String id) {
        String userId = authentication.getName();
        return ResponseEntity.ok(campaignService.getCampaignById(userId, id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Campaign> updateCampaign(
            Authentication authentication, @PathVariable String id,
            @Valid @RequestBody CampaignRequest request) {
        String userId = authentication.getName();

        return ResponseEntity.ok(campaignService.updateCampaign(userId, id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteCampaign(
            Authentication authentication, @PathVariable String id) {
        String userId = authentication.getName();
        campaignService.deleteCampaign(userId, id);
        return ResponseEntity.ok("Campaign deleted successfully");
    }

    @GetMapping("/{id}/recipients")
    public ResponseEntity<List<CampaignRecipient>> getRecipients(
            Authentication authentication, @PathVariable String id) {
        String userId = authentication.getName();
        return ResponseEntity.ok(campaignService.getRecipients(userId, id));
    }

    @PatchMapping("/{id}/status")
    public ResponseEntity<Campaign> updateCampaignStatus(Authentication authentication,
            @PathVariable String id, @RequestParam String status) {
        String userId = authentication.getName();

        return ResponseEntity.ok(campaignService.updateCampaignStatus(userId, id, status));
    }

    @PostMapping("/{id}/send")
    public ResponseEntity<String> sendCampaign(Authentication authentication,
            @PathVariable String id) {
        String userId = authentication.getName();
        campaignService.sendCampaign(userId, id);
        return ResponseEntity.ok("Campaign sent successfully");
    }
}