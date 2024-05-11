package com.astami.backend.controller;

import com.astami.backend.payload.branch.CreateBranchRequest;
import com.astami.backend.payload.branch.CreateBranchResponse;
import com.astami.backend.payload.branch.GetBranchResponse;
import com.astami.backend.payload.company.CreateCompanyRequest;
import com.astami.backend.payload.company.CreateCompanyResponse;
import com.astami.backend.service.BranchService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/branch")
@RequiredArgsConstructor
public class BranchController {

    private final BranchService branchService;

    @GetMapping("{branchId}")
    public ResponseEntity<GetBranchResponse> getBranchById(
            @PathVariable("branchId") long branchId,
            Authentication authentication
    ) {
        return ResponseEntity.ok()
                .body(branchService.getBranchResponseById(branchId, authentication));
    }

    @PostMapping
    @PreAuthorize("hasRole('ENTREPRENEUR')")
    public ResponseEntity<CreateBranchResponse> createBranch(
            @RequestBody CreateBranchRequest body,
            Authentication authentication
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(branchService.createBranch(body, authentication));
    }

}