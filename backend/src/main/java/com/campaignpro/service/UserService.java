package com.campaignpro.service;

import com.campaignpro.dto.UserProfileRequest;
import com.campaignpro.exception.ResourceNotFoundException;
import com.campaignpro.model.User;
import com.campaignpro.repository.UserRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {

        this.userRepository = userRepository;
    }

    public User getProfile(String userId) {
        return userRepository.findById(userId).orElseThrow(() ->
                new ResourceNotFoundException("User not found"));
    }

    public User updateProfile(String userId, UserProfileRequest request) {
        User user = getProfile(userId);

        user.setName(request.getName());
        user.setUpdatedAt(LocalDateTime.now());
        return userRepository.save(user);
    }
}