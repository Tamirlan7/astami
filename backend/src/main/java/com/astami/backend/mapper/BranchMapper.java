package com.astami.backend.mapper;

import com.astami.backend.dto.BranchDto;
import com.astami.backend.model.Branch;


public class BranchMapper {

    public static BranchDto mapToDto(Branch branch) {
        if (branch == null) {
            return null;
        }

        return BranchDto.builder()
                .id(branch.getId())
                .city(branch.getCity())
                .country(branch.getCountry())
                .title(branch.getTitle())
                .companyId(branch.getCompany().getId())
                .build();
    }
}
