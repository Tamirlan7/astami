package com.astami.backend.service;

import com.astami.backend.exception.CustomBadRequestException;
import com.astami.backend.payload.auth.RegisterRequest;
import com.astami.backend.repository.UserRepository;
import com.astami.backend.payload.auth.LoginRequest;
import com.astami.backend.payload.auth.RefreshRequest;
import com.astami.backend.exception.CustomNotFoundException;
import com.astami.backend.jwt.model.Token;
import com.astami.backend.jwt.model.TokenType;
import com.astami.backend.jwt.service.JwtService;
import com.astami.backend.model.Tokens;
import com.astami.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtService jwtService;

    public Tokens register(RegisterRequest body) {
        userRepository.findByPhone(body.phone())
                .ifPresent((u) -> {
                    throw new CustomBadRequestException("User with phone " + body.phone() + " already exist.");
                });

        userRepository.findByEmail(body.email())
                .ifPresent((u) -> {
                    throw new CustomBadRequestException("User with email " + body.email() + " already exist.");
                });

        User user = userRepository.save(
                User.builder()
                        .phone(body.phone())
                        .password(passwordEncoder.encode(body.password()))
                        .email(body.email())
                        .lastName(body.lastName())
                        .firstName(body.firstName())
                        .gender(body.gender())
                        .birthDate(body.birthDate())
                        .build()
        );

        return Tokens.builder()
                .accessToken(jwtService.generateAccessToken(user))
                .refreshToken(jwtService.generateRefreshToken(user))
                .build();
    }

    public Tokens login(LoginRequest body) {
        User user = null;

        if (body.phone() != null && !body.phone().isBlank()) {
            user = userRepository.findByPhone(body.phone())
                    .orElseThrow(() -> new CustomNotFoundException("User with phone " + body.phone() + " not found."));
        }

        if (body.email() != null && !body.email().isBlank()) {
            user = userRepository.findByEmail(body.email())
                    .orElseThrow(() -> new CustomNotFoundException("User with email " + body.email() + " not found."));
        }

        if (user == null) {
            throw new CustomBadRequestException("User not found, the reason could be phone or email are null");
        }

        return Tokens.builder()
                .accessToken(jwtService.generateAccessToken(user))
                .refreshToken(jwtService.generateRefreshToken(user))
                .build();
    }

    public Tokens refresh(RefreshRequest body) {
        Token token = jwtService.deserializeToken(body.refreshToken());

        if (token.getTokenType() == TokenType.ACCESS_TOKEN) {
            throw new CustomBadRequestException("accessToken has been passed, when refreshToken needed.");
        }

        if (jwtService.isValid(token)) {
            User user = userRepository.findById(token.getUserId())
                    .orElseThrow(() -> new CustomBadRequestException("User with id (in refreshToken) " + token.getUserId() + " not found."));

            return Tokens.builder()
                    .accessToken(jwtService.generateAccessToken(user))
                    .refreshToken(jwtService.generateRefreshToken(user))
                    .build();
        } else {
            throw new CustomBadRequestException("RefreshToken is not valid (most probably expired)");
        }
    }
}
