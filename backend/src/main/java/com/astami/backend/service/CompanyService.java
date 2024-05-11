package com.astami.backend.service;

import com.astami.backend.exception.CustomNotFoundException;
import com.astami.backend.mapper.CompanyMapper;
import com.astami.backend.model.Company;
import com.astami.backend.model.User;
import com.astami.backend.payload.company.CreateCompanyRequest;
import com.astami.backend.payload.company.CreateCompanyResponse;
import com.astami.backend.payload.company.GetCompanyResponse;
import com.astami.backend.repository.CompanyRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

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

    public GetCompanyResponse getCompanyById(Long companyId) {
        Company company = companyRepository.findById(companyId)
                .orElseThrow(() -> new CustomNotFoundException("Company with id " + companyId + " not found"));

        return GetCompanyResponse.builder()
                .company(CompanyMapper.mapToDto(company))
                .build();
    }
}
