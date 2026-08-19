package com.campaignpro.controller;

import com.campaignpro.dto.AnalyticsResponse;
import com.campaignpro.service.AnalyticsService;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/analytics")
public class AnalyticsController {

    private final AnalyticsService analyticsService;

    public AnalyticsController(AnalyticsService analyticsService) {
        this.analyticsService = analyticsService;
    }

    @GetMapping("/campaign/{campaignId}")
    public ResponseEntity<AnalyticsResponse> getCampaignAnalytics(
            Authentication authentication, @PathVariable String campaignId) {

        String userId = authentication.getName();

        return ResponseEntity.ok(analyticsService
                .getCampaignAnalytics(userId, campaignId));
    }
}