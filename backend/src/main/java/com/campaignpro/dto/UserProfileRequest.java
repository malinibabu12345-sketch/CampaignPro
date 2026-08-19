package com.campaignpro.dto;

public class UserProfileRequest {

    private String name;

    public UserProfileRequest() {
    }

    public UserProfileRequest(String name) {

        this.name = name;
    }

    public String getName() {

        return name;
    }

    public void setName(String name) {

        this.name = name;
    }
}