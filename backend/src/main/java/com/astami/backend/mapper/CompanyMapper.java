package com.astami.backend.mapper;

import com.astami.backend.dto.CompanyDto;
import com.astami.backend.model.Company;

public class CompanyMapper {

    public static CompanyDto mapToDto(Company company) {
        return CompanyDto.builder()
                .id(company.getId())
                .branches(company.getBranches())
                .userId(company.getUser().getId())
                .title(company.getTitle())
                .build();
    }

}
