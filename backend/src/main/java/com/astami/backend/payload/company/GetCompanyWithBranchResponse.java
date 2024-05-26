package com.astami.backend.payload.company;

import com.astami.backend.dto.BranchDto;
import com.astami.backend.dto.CompanyDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetCompanyWithBranchResponse {
    private CompanyDto company;
    private BranchDto branch;
}
