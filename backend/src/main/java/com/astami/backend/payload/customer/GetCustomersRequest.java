package com.astami.backend.payload.customer;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.Authentication;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetCustomersRequest {
    private Authentication authentication;
    private long branchId;
    private long companyId;
    private int page;
    private int size;
    private String name;
}
