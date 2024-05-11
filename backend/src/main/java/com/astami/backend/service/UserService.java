package com.astami.backend.service;

import com.astami.backend.exception.CustomBadRequestException;
import com.astami.backend.exception.CustomNotFoundException;
import com.astami.backend.jwt.model.Token;
import com.astami.backend.model.CustomUserDetails;
import com.astami.backend.model.User;
import com.astami.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;

    public User getUserFromAuthentication(Authentication authentication) {
        if (authentication instanceof PreAuthenticatedAuthenticationToken auth) {
            if (auth.getPrincipal() instanceof CustomUserDetails userDetails) {
                return userRepository.findByPhone(userDetails.getUsername())
                        .orElseThrow(() -> new CustomNotFoundException("User with phone " + userDetails.getUsername() + " not found"));
            }
        }

        throw new CustomBadRequestException("User could not be extracted from authentication");
    }
}
