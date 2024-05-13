package com.astami.backend.service;

import com.astami.backend.exception.CustomNotFoundException;
import com.astami.backend.mapper.CompanyMapper;
import com.astami.backend.model.Company;
import com.astami.backend.model.Role;
import com.astami.backend.model.User;
import com.astami.backend.payload.company.CreateCompanyRequest;
import com.astami.backend.payload.company.CreateCompanyResponse;
import com.astami.backend.payload.company.GetCompanyResponse;
import com.astami.backend.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Objects;

@Service
@RequiredArgsConstructor
public class CompanyService {

    private final UserService userService;
    private final CompanyRepository companyRepository;

    public CreateCompanyResponse createCompany(CreateCompanyRequest body, Authentication authentication) {
        User user = userService.getUserFromAuthentication(authentication);

        Company company = Company.builder()
                .title(body.title())
                .build();

        company.setUser(user);
        company = companyRepository.save(company);

        return CreateCompanyResponse.builder()
                .company(CompanyMapper.mapToDto(company))
                .build();
    }

    public Company getCompanyById(Long companyId) {
        return companyRepository.findById(companyId)
                .orElseThrow(() -> new CustomNotFoundException("Company with id " + companyId + " not found"));
    }

    public GetCompanyResponse getCompanyResponseById(Long companyId) {
        Company company = this.getCompanyById(companyId);

        return GetCompanyResponse.builder()
                .company(CompanyMapper.mapToDto(company))
                .build();
    }

    public boolean isUserAllowed(Authentication authentication, long companyId) {
        // function to check if the user allowed
        // to make changes to specific branches or companies

        User user = userService.getUserFromAuthentication(authentication);
        Company company = this.getCompanyById(companyId);

        if (!Objects.equals(company.getUser().getId(), user.getId())) {
            // User is not the owner of this company

            if (user.getRole() != Role.ROLE_ADMIN) {
                // user is not even admin

                return true;
            }
        }

        return false;
    }
}
