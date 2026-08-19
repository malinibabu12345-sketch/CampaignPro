package com.campaignpro.controller;

import com.campaignpro.dto.AdminAnalyticsResponse;
import com.campaignpro.model.Campaign;
import com.campaignpro.model.EmailEvent;
import com.campaignpro.model.User;
import com.campaignpro.service.AdminService;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin")
public class AdminController {

    private final AdminService adminService;
    public AdminController(AdminService adminService) {
        this.adminService = adminService;
    }

    @GetMapping("/users")
    public ResponseEntity<List<User>> getAllUsers() {
        return ResponseEntity.ok(adminService.getAllUsers());
    }
    @GetMapping("/users/{id}")
    public ResponseEntity<User> getUserById(@PathVariable String id) {
        return ResponseEntity.ok(adminService.getUserById(id));
    }
    @DeleteMapping("/users/{id}")
    public ResponseEntity<String> deleteUser(@PathVariable String id) {
        adminService.deleteUser(id);
        return ResponseEntity.ok("User deleted successfully");
    }
    @GetMapping("/campaigns")
    public ResponseEntity<List<Campaign>> getAllCampaigns() {
        return ResponseEntity.ok(adminService.getAllCampaigns());
    }
    @GetMapping("/activities")
    public ResponseEntity<List<EmailEvent>> getSystemActivities() {
        return ResponseEntity.ok(adminService.getSystemActivities());
    }

    @GetMapping("/analytics")
    public ResponseEntity<AdminAnalyticsResponse> getOverallAnalytics() {
        return ResponseEntity.ok(adminService.getOverallAnalytics());
    }
}
