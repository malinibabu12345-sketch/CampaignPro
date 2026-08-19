package com.campaignpro.repository;

import com.campaignpro.model.CampaignRecipient;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface CampaignRecipientRepository extends MongoRepository<CampaignRecipient, String> {

    List<CampaignRecipient> findByCampaignId(String campaignId);
    long countByStatus(String status);
    long countByDeliveredAtIsNotNull();
    long countByOpenedAtIsNotNull();
    long countByClickedAtIsNotNull();
}