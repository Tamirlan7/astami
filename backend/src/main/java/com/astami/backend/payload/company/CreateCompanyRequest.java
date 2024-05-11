package com.astami.backend.payload.company;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CreateCompanyRequest(
        @NotBlank
        @Size(max = 100)
        String title
) {
}
