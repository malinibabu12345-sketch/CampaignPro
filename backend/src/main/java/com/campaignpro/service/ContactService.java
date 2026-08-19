package com.campaignpro.service;

import com.campaignpro.dto.ContactRequest;
import com.campaignpro.exception.ResourceNotFoundException;
import com.campaignpro.model.Contact;
import com.campaignpro.repository.ContactRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ContactService {

    private final ContactRepository contactRepository;

    public ContactService(ContactRepository contactRepository) {

        this.contactRepository = contactRepository;
    }

    public Contact createContact(String userId, ContactRequest request) {

        Contact contact = new Contact();
        contact.setUserId(userId);
        contact.setName(request.getName());
        contact.setEmail(request.getEmail());
        contact.setPhone(request.getPhone());
        contact.setCompany(request.getCompany());
        contact.setGroupIds(request.getGroupIds());
        contact.setStatus(request.getStatus() == null ? "ACTIVE" : request.getStatus());

        LocalDateTime now = LocalDateTime.now();
        contact.setCreatedAt(now);
        contact.setUpdatedAt(now);
        return contactRepository.save(contact);
    }

    public List<Contact> getAllContacts(String userId) {

        return contactRepository.findByUserId(userId);
    }
    public Contact getContactById(String userId, String contactId) {

        Contact contact = contactRepository.findById(contactId)
                .orElseThrow(() -> new ResourceNotFoundException("Contact not found"));

        if (!contact.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Contact not found");
        }
        return contact;
    }

    public Contact updateContact(String userId, String contactId, ContactRequest request) {

        Contact contact = getContactById(userId, contactId);
        contact.setName(request.getName());
        contact.setEmail(request.getEmail());
        contact.setPhone(request.getPhone());
        contact.setCompany(request.getCompany());
        contact.setGroupIds(request.getGroupIds());

        if (request.getStatus() != null) {
            contact.setStatus(request.getStatus());
        }
        contact.setUpdatedAt(LocalDateTime.now());
        return contactRepository.save(contact);
    }

    public void deleteContact(String userId, String contactId) {
        Contact contact = getContactById(userId, contactId);
        contactRepository.delete(contact);
    }

    public List<Contact> searchByName(String userId, String name) {
        return contactRepository.findByUserIdAndNameContainingIgnoreCase(userId, name);
    }

    public List<Contact> searchByEmail(String userId, String email) {
        return contactRepository.findByUserIdAndEmailContainingIgnoreCase(userId, email);
    }
}
