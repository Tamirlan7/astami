package com.astami.backend.payload.branch;

import jakarta.validation.constraints.NotBlank;import jakarta.validation.constraints.Size;

public record CreateBranchRequest(
        @NotBlank
        @Size(max = 100)
        String title,

        @Size(max = 100)
        @NotBlank
        String country,

        @Size(max = 100)
        @NotBlank
        String city
) {
}
