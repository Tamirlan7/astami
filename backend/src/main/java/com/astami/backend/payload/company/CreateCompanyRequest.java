package com.astami.backend.payload.company;

import com.astami.backend.dto.BranchDto;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.util.List;

public record CreateCompanyRequest(
        @NotBlank
        @Size(max = 100)
        String title,

        @NotNull
        @Size(min = 1)
        List<BranchDto> branches
) {
}
