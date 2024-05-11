package com.astami.backend.payload.branch;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

public record CreateBranchRequest(
        @NotBlank
        @Size(max = 100)
        String title,

        @NotNull
        long companyId
) {
}
