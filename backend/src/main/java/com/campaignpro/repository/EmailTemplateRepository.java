package com.campaignpro.repository;

import com.campaignpro.model.EmailTemplate;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EmailTemplateRepository extends MongoRepository<EmailTemplate, String> {

    List<EmailTemplate> findByUserId(String userId);

    List<EmailTemplate> findByUserIdAndNameContainingIgnoreCase(String userId, String name);
}
