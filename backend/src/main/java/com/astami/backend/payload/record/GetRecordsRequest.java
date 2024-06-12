package com.astami.backend.payload.record;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.security.core.Authentication;

import java.time.LocalDate;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetRecordsRequest {
    private Authentication authentication;
    private long branchId;
    private long companyId;
    private int page;
    private int size;
    private LocalDate date;
}
