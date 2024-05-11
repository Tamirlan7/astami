package com.astami.backend.payload.auth;

import com.astami.backend.model.Gender;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.time.LocalDate;

public record RegisterRequest(
        @Email
        @NotBlank
        String email,

        @NotBlank
        String phone,

        @Size(min = 8)
        @NotBlank
        String password,

        @NotBlank
        @Size(max = 100)
        String firstName,

        @NotBlank
        @Size(max = 100)
        String lastName,

        @NotNull
        Gender gender,

        @NotNull
        LocalDate birthDate
) {
}
