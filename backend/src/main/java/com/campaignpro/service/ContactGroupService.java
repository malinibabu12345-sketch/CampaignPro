package com.campaignpro.service;

import com.campaignpro.dto.ContactGroupRequest;
import com.campaignpro.exception.ResourceNotFoundException;
import com.campaignpro.model.ContactGroup;
import com.campaignpro.repository.ContactGroupRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class ContactGroupService {

    private final ContactGroupRepository contactGroupRepository;

    public ContactGroupService(ContactGroupRepository contactGroupRepository) {
        this.contactGroupRepository = contactGroupRepository;
    }

    public ContactGroup createGroup(String userId, ContactGroupRequest request) {

        ContactGroup group = new ContactGroup();
        group.setUserId(userId);
        group.setName(request.getName());
        group.setDescription(request.getDescription());

        LocalDateTime now = LocalDateTime.now();
        group.setCreatedAt(now);
        group.setUpdatedAt(now);
        return contactGroupRepository.save(group);
    }

    public List<ContactGroup> getAllGroups(String userId) {
        return contactGroupRepository.findByUserId(userId);
    }

    public ContactGroup getGroupById(String userId, String groupId) {

        ContactGroup group = contactGroupRepository.findById(groupId)
                .orElseThrow(() -> new ResourceNotFoundException
                        ("Contact group not found"));
        if (!group.getUserId().equals(userId)) {
            throw new ResourceNotFoundException("Contact group not found");
        }
        return group;
    }

    public ContactGroup updateGroup(String userId, String groupId,
            ContactGroupRequest request) {
        ContactGroup group = getGroupById(userId, groupId);

        group.setName(request.getName());
        group.setDescription(request.getDescription());
        group.setUpdatedAt(LocalDateTime.now());
        return contactGroupRepository.save(group);
    }
    public void deleteGroup(String userId, String groupId) {
        ContactGroup group = getGroupById(userId, groupId);
        contactGroupRepository.delete(group);
    }

    public List<ContactGroup> searchGroups(String userId, String name) {
        return contactGroupRepository.findByUserIdAndNameContainingIgnoreCase(userId, name);
    }
}