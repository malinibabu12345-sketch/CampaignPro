package com.campaignpro.controller;

import com.campaignpro.service.TrackingService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tracking")
public class TrackingController {

    private final TrackingService trackingService;

    public TrackingController(TrackingService trackingService) {
        this.trackingService = trackingService;
    }

    @PostMapping("/open/{recipientId}")
    public ResponseEntity<String> trackOpen(@PathVariable String recipientId) {
        trackingService.trackOpen(recipientId);
        return ResponseEntity.ok("Email opened successfully");
    }

    @PostMapping("/click/{recipientId}")
    public ResponseEntity<String> trackClick(@PathVariable String recipientId) {
        trackingService.trackClick(recipientId);

        return ResponseEntity.ok("Email click tracked successfully");
    }
}