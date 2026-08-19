package com.campaignpro.service;

import com.campaignpro.dto.AdminAnalyticsResponse;
import com.campaignpro.exception.ResourceNotFoundException;
import com.campaignpro.model.Campaign;
import com.campaignpro.model.EmailEvent;
import com.campaignpro.model.User;
import com.campaignpro.repository.CampaignRecipientRepository;
import com.campaignpro.repository.CampaignRepository;
import com.campaignpro.repository.EmailEventRepository;
import com.campaignpro.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AdminService {

    private final UserRepository userRepository;
    private final CampaignRepository campaignRepository;
    private final EmailEventRepository emailEventRepository;
    private final CampaignRecipientRepository campaignRecipientRepository;

    public AdminService(UserRepository userRepository, CampaignRepository campaignRepository,
            EmailEventRepository emailEventRepository, CampaignRecipientRepository campaignRecipientRepository) {

        this.userRepository = userRepository;
        this.campaignRepository = campaignRepository;
        this.emailEventRepository = emailEventRepository;
        this.campaignRecipientRepository = campaignRecipientRepository;
    }
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    public List<Campaign> getAllCampaigns() {
        return campaignRepository.findAll();
    }
    public List<EmailEvent> getSystemActivities() {
        return emailEventRepository.findAllByOrderByTimestampDesc();
    }
    public User getUserById(String userId) {
        return userRepository.findById(userId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found"));
    }

    public void deleteUser(String userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new  ResourceNotFoundException("User not found"));

        userRepository.delete(user);
    }

    public AdminAnalyticsResponse getOverallAnalytics() {
        long totalUsers = userRepository.count();
        long totalCampaigns = campaignRepository.count();
        long totalEmailsSent = campaignRecipientRepository.countByStatus("SENT");
        long totalDelivered = campaignRecipientRepository.countByDeliveredAtIsNotNull();
        long totalOpened = campaignRecipientRepository.countByOpenedAtIsNotNull();
        long totalClicked = campaignRecipientRepository.countByClickedAtIsNotNull();
        long totalFailed = campaignRecipientRepository.countByStatus("FAILED");

        return new AdminAnalyticsResponse(totalUsers, totalCampaigns, totalEmailsSent,
                totalDelivered, totalOpened, totalClicked, totalFailed);
    }
}
