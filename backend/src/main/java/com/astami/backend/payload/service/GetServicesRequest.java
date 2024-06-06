package com.astami.backend.payload.service;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.Authentication;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetServicesRequest {

    private long companyId;
    private long branchId;
    private Authentication authentication;
    private String title;
    private int page;
    private int size;

}
