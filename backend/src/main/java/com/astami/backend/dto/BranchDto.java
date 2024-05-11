package com.astami.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class BranchDto {
    private Long id;
    private String title;
    private String city;
    private String country;
    private long companyId;
}
