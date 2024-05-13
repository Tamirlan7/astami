package com.astami.backend.service;

import com.astami.backend.exception.CustomBadRequestException;
import com.astami.backend.exception.CustomNotFoundException;
import com.astami.backend.mapper.BranchMapper;
import com.astami.backend.model.Branch;
import com.astami.backend.model.Company;
import com.astami.backend.payload.branch.CreateBranchRequest;
import com.astami.backend.payload.branch.CreateBranchResponse;
import com.astami.backend.payload.branch.GetBranchResponse;
import com.astami.backend.repository.BranchRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BranchService {
    private final BranchRepository branchRepository;
    private final CompanyService companyService;


    public CreateBranchResponse createBranch(CreateBranchRequest body, Authentication authentication, long companyId) {
        Company company = companyService
                .getCompanyById(companyId);

        if (companyService.isUserAllowed(authentication, companyId)) {
            throw new CustomBadRequestException("User is not the owner of this company");
        }

        Branch branch = Branch.builder()
                .city(body.city())
                .title(body.title())
                .country(body.country())
                .build();

        branch.setCompany(company);
        branch = branchRepository.save(branch);

        return CreateBranchResponse.builder()
                .branch(BranchMapper.mapToDto(branch))
                .build();
    }

    public GetBranchResponse getBranchResponseById(long branchId, Authentication authentication) {
        Branch branch = this.getBranchById(branchId);

        if (companyService.isUserAllowed(authentication, branch.getCompany().getId())) {
            throw new CustomBadRequestException("User is not the owner of this company");
        }

        return GetBranchResponse.builder()
                .branch(BranchMapper.mapToDto(branch))
                .build();
    }

    public Branch getBranchById(long branchId) {
        return branchRepository.findById(branchId)
                .orElseThrow(() -> new CustomNotFoundException("Branch with id " + branchId + " not found"));
    }
}
