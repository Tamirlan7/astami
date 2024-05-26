package com.astami.backend.jwt.model;

import com.astami.backend.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.Instant;

@AllArgsConstructor
@Data
@NoArgsConstructor
@Builder
public class Token {
    private String id;
    private Instant issuedAt;
    private Instant expiration;
    private TokenType tokenType;
    private Role role;
    private Long userId;
}
