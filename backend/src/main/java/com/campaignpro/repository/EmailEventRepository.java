package com.campaignpro.repository;

import com.campaignpro.model.EmailEvent;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface EmailEventRepository extends MongoRepository<EmailEvent, String> {

    List<EmailEvent> findByCampaignId(String campaignId);
    List<EmailEvent> findByRecipientId(String recipientId);
    List<EmailEvent> findByCampaignIdAndEventType(String campaignId, String eventType);
    long countByCampaignIdAndEventType(String campaignId, String eventType);
    List<EmailEvent> findAllByOrderByTimestampDesc();
    long countByEventType(String eventType);
}