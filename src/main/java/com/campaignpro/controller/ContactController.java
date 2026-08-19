package com.campaignpro.controller;

import com.campaignpro.dto.ContactRequest;
import com.campaignpro.model.Contact;
import com.campaignpro.service.ContactService;

import jakarta.validation.Valid;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
public class ContactController {

    private final ContactService contactService;
    public ContactController(ContactService contactService) {
        this.contactService = contactService;
    }

    @PostMapping
    public ResponseEntity<Contact> createContact(
            Authentication authentication, @Valid @RequestBody ContactRequest request) {
        String userId = authentication.getName();

        return ResponseEntity.ok(contactService.createContact(userId, request));
    }

    @GetMapping
    public ResponseEntity<List<Contact>> getAllContacts(Authentication authentication) {
        String userId = authentication.getName();
        return ResponseEntity.ok(contactService.getAllContacts(userId));
    }

    @GetMapping("/{id}")
    public ResponseEntity<Contact> getContactById(
            Authentication authentication, @PathVariable String id) {
        String userId = authentication.getName();

        return ResponseEntity.ok(contactService.getContactById(userId, id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Contact> updateContact(
            Authentication authentication, @PathVariable String id,
            @Valid @RequestBody ContactRequest request) {
        String userId = authentication.getName();

        return ResponseEntity.ok(contactService.updateContact(userId, id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteContact(
            Authentication authentication, @PathVariable String id) {
        String userId = authentication.getName();
        contactService.deleteContact(userId, id);

        return ResponseEntity.ok("Contact deleted successfully");
    }

    @GetMapping("/search/name")
    public ResponseEntity<List<Contact>> searchByName(
            Authentication authentication, @RequestParam String name) {
        String userId = authentication.getName();

        return ResponseEntity.ok(contactService.searchByName(userId, name));
    }

    @GetMapping("/search/email")
    public ResponseEntity<List<Contact>> searchByEmail(
            Authentication authentication, @RequestParam String email) {
        String userId = authentication.getName();

        return ResponseEntity.ok(contactService.searchByEmail(userId, email));
    }
}