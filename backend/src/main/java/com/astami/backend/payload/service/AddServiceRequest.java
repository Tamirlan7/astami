package com.astami.backend.payload.service;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;

import java.sql.Time;
import java.time.Duration;

public record AddServiceRequest(
        @NotBlank
        @Size(min = 1, max = 100)
        String title,

        @Size(min = 1, max = 500)
        String description,

        @PositiveOrZero
        float price,
        Duration duration,
        Time availableFrom,
        Time availableTo
) {
}
