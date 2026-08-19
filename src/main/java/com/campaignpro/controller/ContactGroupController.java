package com.campaignpro.controller;

import com.campaignpro.dto.ContactGroupRequest;
import com.campaignpro.model.ContactGroup;
import com.campaignpro.service.ContactGroupService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/groups")
public class ContactGroupController {

    private final ContactGroupService contactGroupService;
    public ContactGroupController(ContactGroupService contactGroupService) {
        this.contactGroupService = contactGroupService;
    }

    @PostMapping
    public ResponseEntity<ContactGroup> createGroup(Authentication authentication,
            @RequestBody ContactGroupRequest request) {

        String userId = authentication.getName();
        return ResponseEntity.ok(contactGroupService.createGroup(userId, request));
    }

    @GetMapping
    public ResponseEntity<List<ContactGroup>> getAllGroups(Authentication authentication) {
        String userId = authentication.getName();
        return ResponseEntity.ok(contactGroupService.getAllGroups(userId));
    }
    @GetMapping("/{id}")
    public ResponseEntity<ContactGroup> getGroupById(
            Authentication authentication, @PathVariable String id) {
        String userId = authentication.getName();
        return ResponseEntity.ok(contactGroupService.getGroupById(userId, id));
    }
    @PutMapping("/{id}")
    public ResponseEntity<ContactGroup> updateGroup(
            Authentication authentication, @PathVariable String id,
            @RequestBody ContactGroupRequest request) {
        String userId = authentication.getName();

        return ResponseEntity.ok(contactGroupService.updateGroup(userId, id, request));
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteGroup(
            Authentication authentication, @PathVariable String id) {
        String userId = authentication.getName();
        contactGroupService.deleteGroup(userId, id);

        return ResponseEntity.ok("Contact group deleted successfully");
    }

    @GetMapping("/search")
    public ResponseEntity<List<ContactGroup>> searchGroups
            (Authentication authentication, @RequestParam String name) {
        String userId = authentication.getName();
        return ResponseEntity.ok(contactGroupService.searchGroups(userId, name));
    }
}
