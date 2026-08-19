package com.campaignpro.dto;

public class AdminAnalyticsResponse {

    private long totalUsers;
    private long totalCampaigns;
    private long totalEmailsSent;
    private long totalDelivered;
    private long totalOpened;
    private long totalClicked;
    private long totalFailed;

    public AdminAnalyticsResponse() {
    }

    public AdminAnalyticsResponse(
            long totalUsers, long totalCampaigns, long totalEmailsSent,
            long totalDelivered, long totalOpened, long totalClicked,
            long totalFailed) {
        this.totalUsers = totalUsers;
        this.totalCampaigns = totalCampaigns;
        this.totalEmailsSent = totalEmailsSent;
        this.totalDelivered = totalDelivered;
        this.totalOpened = totalOpened;
        this.totalClicked = totalClicked;
        this.totalFailed = totalFailed;
    }

    public long getTotalUsers() {
        return totalUsers;
    }
    public void setTotalUsers(long totalUsers) {
        this.totalUsers = totalUsers;
    }
    public long getTotalCampaigns() {
        return totalCampaigns;
    }
    public void setTotalCampaigns(long totalCampaigns) {
        this.totalCampaigns = totalCampaigns;
    }
    public long getTotalEmailsSent() {
        return totalEmailsSent;
    }
    public void setTotalEmailsSent(long totalEmailsSent) {
        this.totalEmailsSent = totalEmailsSent;
    }
    public long getTotalDelivered() {
        return totalDelivered;
    }
    public void setTotalDelivered(long totalDelivered) {
        this.totalDelivered = totalDelivered;
    }
    public long getTotalOpened() {
        return totalOpened;
    }
    public void setTotalOpened(long totalOpened) {
        this.totalOpened = totalOpened;
    }
    public long getTotalClicked() {
        return totalClicked;
    }
    public void setTotalClicked(long totalClicked) {
        this.totalClicked = totalClicked;
    }
    public long getTotalFailed() {
        return totalFailed;
    }
    public void setTotalFailed(long totalFailed) {
        this.totalFailed = totalFailed;
    }
}