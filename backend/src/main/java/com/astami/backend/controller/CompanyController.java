package com.astami.backend.controller;

import com.astami.backend.payload.company.CreateCompanyRequest;
import com.astami.backend.payload.company.CreateCompanyResponse;
import com.astami.backend.payload.company.GetCompanyResponse;
import com.astami.backend.service.CompanyService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/company")
@RequiredArgsConstructor
public class CompanyController {

    private final CompanyService companyService;

    @GetMapping("/{id}")
    public ResponseEntity<GetCompanyResponse> getCompanyById(
            @PathVariable("id") Long companyId
    ) {
        return ResponseEntity.ok()
                .body(companyService.getCompanyResponseById(companyId));
    }

    @PostMapping
    @PreAuthorize("hasRole('ENTREPRENEUR')")
    public ResponseEntity<CreateCompanyResponse> createCompany(
            @RequestBody @Valid CreateCompanyRequest body,
            Authentication authentication
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(companyService.createCompany(body, authentication));
    }

}
