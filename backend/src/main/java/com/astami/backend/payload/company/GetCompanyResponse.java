package com.astami.backend.payload.company;

import com.astami.backend.dto.BranchDto;
import com.astami.backend.dto.CompanyDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetCompanyResponse {
    private CompanyDto company;
    private BranchDto currentBranch;
}
