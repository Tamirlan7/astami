package com.astami.backend.payload.service;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

public record CreateServiceRequest(
        @NotBlank
        @Size(min = 1, max = 100)
        String title,

        @Size(min = 1, max = 5000)
        String description,

        @PositiveOrZero
        float price,

        long duration
) {
}
