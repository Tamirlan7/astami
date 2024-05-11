package com.astami.backend.payload.auth;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record LoginRequest(
        @Email
        String email,

        String phone,

        @Size(min = 8)
        @NotBlank
        String password
) {
}