package com.campaignpro.dto;

public class AnalyticsResponse {

    private long totalEmailsSent;

    private long totalDelivered;

    private long totalOpened;

    private long totalClicked;

    private long totalFailed;

    private double deliveryRate;

    private double openRate;

    private double clickRate;

    public AnalyticsResponse() {
    }

    public AnalyticsResponse(long totalEmailsSent, long totalDelivered,
                             long totalOpened, long totalClicked, long totalFailed,
                             double deliveryRate, double openRate, double clickRate) {
        this.totalEmailsSent = totalEmailsSent;
        this.totalDelivered = totalDelivered;
        this.totalOpened = totalOpened;
        this.totalClicked = totalClicked;
        this.totalFailed = totalFailed;
        this.deliveryRate = deliveryRate;
        this.openRate = openRate;
        this.clickRate = clickRate;
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
    public double getDeliveryRate() {
        return deliveryRate;
    }
    public void setDeliveryRate(double deliveryRate) {
        this.deliveryRate = deliveryRate;
    }
    public double getOpenRate() {
        return openRate;
    }
    public void setOpenRate(double openRate) {
        this.openRate = openRate;
    }
    public double getClickRate() {
        return clickRate;
    }
    public void setClickRate(double clickRate) {
        this.clickRate = clickRate;
    }
}