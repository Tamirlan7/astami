package com.astami.backend.payload.employee;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import org.springframework.web.multipart.MultipartFile;

public record AddEmployeeRequest(
        @NotBlank
        @Size(min = 2, max = 100)
        String fullName,

        @Size(max = 500)
        String description,

        MultipartFile image
) {
}
