package com.campaignpro.repository;

import com.campaignpro.model.Contact;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ContactRepository extends MongoRepository<Contact, String> {

    List<Contact> findByUserId(String userId);

    List<Contact> findByUserIdAndStatus(String userId, String status);

    List<Contact> findByUserIdAndNameContainingIgnoreCase(String userId, String name);

    List<Contact> findByUserIdAndEmailContainingIgnoreCase(String userId, String email);
}