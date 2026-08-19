package com.campaignpro.repository;

import com.campaignpro.model.ContactGroup;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ContactGroupRepository extends MongoRepository<ContactGroup, String> {

    List<ContactGroup> findByUserId(String userId);

    List<ContactGroup> findByUserIdAndNameContainingIgnoreCase(String userId, String name);

}