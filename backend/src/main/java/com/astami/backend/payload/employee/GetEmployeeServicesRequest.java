package com.astami.backend.payload.employee;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.Authentication;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetEmployeeServicesRequest {
    private long employeeId;
    private long branchId;
    private long companyId;
    private Authentication authentication;
}
