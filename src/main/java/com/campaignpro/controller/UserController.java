package com.campaignpro.controller;

import com.campaignpro.dto.UserProfileRequest;
import com.campaignpro.model.User;
import com.campaignpro.service.UserService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }
    @GetMapping("/profile")
    public ResponseEntity<User> getProfile(Authentication authentication) {
        String userId = authentication.getName();
        return ResponseEntity.ok(userService.getProfile(userId));
    }

    @PutMapping("/profile")
    public ResponseEntity<User> updateProfile(Authentication authentication,
            @RequestBody UserProfileRequest request) {
        String userId = authentication.getName();

        return ResponseEntity.ok(userService.updateProfile(userId, request));
    }
}
