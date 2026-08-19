package com.campaignpro.repository;

import com.campaignpro.model.Campaign;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface CampaignRepository extends MongoRepository<Campaign, String> {

    List<Campaign> findByUserId(String userId);

    List<Campaign> findByUserIdAndStatus(String userId, String status);

    List<Campaign> findByUserIdAndNameContainingIgnoreCase(String userId, String name);

    List<Campaign> findByStatusAndScheduledAtLessThanEqual(String status, LocalDateTime scheduledAt);
}