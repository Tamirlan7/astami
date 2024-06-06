package com.astami.backend.payload.employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.Authentication;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetEmployeeFilesRequest {
    private long companyId;
    private Authentication authentication;
    private long employeeId;
    private String fileName;
}
