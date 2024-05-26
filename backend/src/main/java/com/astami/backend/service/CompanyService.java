package com.astami.backend.service;

import com.astami.backend.dto.BranchDto;
import com.astami.backend.exception.CustomBadRequestException;
import com.astami.backend.exception.CustomNotFoundException;
import com.astami.backend.mapper.BranchMapper;
import com.astami.backend.mapper.CompanyMapper;
import com.astami.backend.model.Branch;
import com.astami.backend.model.Company;
import com.astami.backend.model.Role;
import com.astami.backend.model.User;
import com.astami.backend.payload.company.*;
import com.astami.backend.repository.CompanyRepository;
import com.astami.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final UserService userService;
    private final CompanyRepository companyRepository;
    private final UserRepository userRepository;

    @Transactional
    public CreateCompanyResponse createCompany(CreateCompanyRequest body, Authentication authentication) {
        User user = userService.getUserFromAuthentication(authentication);

        int companyCount = companyRepository.countAllByUserId(user.getId());
        if (companyCount == 20) {
            throw new CustomBadRequestException("Невозможно добавить компанию, так как превышает лимит (20)");
        }

        if (companyRepository.findByTitle(body.title()).isPresent()) {
            throw new CustomBadRequestException("Невозможно добавить компанию, так как компания с таким именем уже зарегистрирована");
        }

        Company company = Company.builder()
                .title(body.title())
                .build();

        company.setUser(user);
        company = companyRepository.save(company);

        List<Branch> branches = new ArrayList<>();
        for (BranchDto b : body.branches()) {
            Branch branch = Branch.builder()
                    .title(b.getTitle())
                    .company(company)
                    .country(b.getCountry())
                    .city(b.getCity())
                    .build();

            branches.add(branch);
        }

        company.getBranches().addAll(branches);
        company = companyRepository.save(company);

        return CreateCompanyResponse.builder()
                .company(CompanyMapper.mapToDto(company))
                .build();
    }

    public Company getCompanyById(Long companyId) {
        return companyRepository.findById(companyId)
                .orElseThrow(() -> new CustomNotFoundException("Компания с идентификатором " + companyId + " не найден"));
    }

    @Transactional
    public GetCompanyResponse getCompanyResponseById(Long companyId, Authentication authentication) {
        User user = userService.getUserFromAuthentication(authentication);
        Company company = this.getCompanyById(companyId);
        Branch branch = user.getLastRequestedBranch();

        if (branch == null && !company.getBranches().isEmpty()) {
            branch = company.getBranches().get(0);
            user.setLastRequestedBranch(branch);
            userRepository.save(user);
        }

        return GetCompanyResponse.builder()
                .company(CompanyMapper.mapToDto(company))
                .currentBranch(BranchMapper.mapToDto(branch))
                .build();
    }

    public void validateUserCompany(Authentication authentication, long companyId) {
        // function to check if the user allowed
        // to make changes to specific branches or companies

        User user = userService.getUserFromAuthentication(authentication);
        Company company = this.getCompanyById(companyId);

        if (!Objects.equals(company.getUser().getId(), user.getId())) {
            // User is not the owner of this company

            if (user.getRole() != Role.ROLE_ADMIN) {
                // user is not even admin

                throw new CustomBadRequestException("У пользователя нет доступа к этой компании");
            }
        }
    }

    public GetCompaniesResponse getUserCompanies(Authentication authentication) {
        User user = userService.getUserFromAuthentication(authentication);

        return GetCompaniesResponse.builder()
                .companies(companyRepository.findAllByUserId(user.getId()).stream().map(CompanyMapper::mapToDto).toList())
                .build();
    }

    public UpdateCompanyResponse updateCompany(UpdateCompanyRequest body, long companyId, Authentication authentication) {
        Company company = this.getCompanyById(companyId);
        this.validateUserCompany(authentication, companyId);

        if (body.title() != null) {
            company.setTitle(body.title());
        }

        return UpdateCompanyResponse.builder()
                .company(CompanyMapper.mapToDto(company))
                .build();
    }
}
