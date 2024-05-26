package com.astami.backend.mapper;

import com.astami.backend.dto.CompanyDto;
import com.astami.backend.model.Company;

public class CompanyMapper {

    public static CompanyDto mapToDto(Company company) {
        if (company == null) {
            return null;
        }

        return CompanyDto.builder()
                .id(company.getId())
                .branches(company.getBranches().stream().map(BranchMapper::mapToDto).toList())
                .userId(company.getUser().getId())
                .title(company.getTitle())
                .build();
    }

}
