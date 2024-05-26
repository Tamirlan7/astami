package com.astami.backend.service;

import com.astami.backend.exception.CustomNotFoundException;
import com.astami.backend.mapper.BranchMapper;
import com.astami.backend.model.Branch;
import com.astami.backend.model.Company;
import com.astami.backend.model.User;
import com.astami.backend.payload.branch.CreateBranchRequest;
import com.astami.backend.payload.branch.CreateBranchResponse;
import com.astami.backend.payload.branch.GetBranchResponse;
import com.astami.backend.repository.BranchRepository;
import com.astami.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class BranchService {
    private final BranchRepository branchRepository;
    private final CompanyService companyService;
    private final UserService userService;
    private final UserRepository userRepository;

    public CreateBranchResponse createBranch(CreateBranchRequest body, Authentication authentication, long companyId) {
        Company company = companyService.getCompanyById(companyId);
        companyService.validateUserCompany(authentication, companyId);

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

    public GetBranchResponse getBranchResponseById(long branchId, long companyId, Authentication authentication) {
        companyService.validateUserCompany(authentication, companyId);
        Branch branch = this.getBranchById(branchId);

        return GetBranchResponse.builder()
                .branch(BranchMapper.mapToDto(branch))
                .build();
    }

    public Branch getBranchById(long branchId) {
        return branchRepository.findById(branchId)
                .orElseThrow(() -> new CustomNotFoundException("Branch with id " + branchId + " not found"));
    }

    public void updateLastRequestedBranch(long branchId, long companyId, Authentication authentication) {
        companyService.validateUserCompany(authentication, companyId);
        Branch branch = this.getBranchById(branchId);

        User user = userService.getUserFromAuthentication(authentication);
        user.setLastRequestedBranch(branch);
        userRepository.save(user);
    }
}
