package com.astami.backend.controller;

import com.astami.backend.payload.branch.CreateBranchRequest;
import com.astami.backend.payload.branch.CreateBranchResponse;
import com.astami.backend.payload.branch.GetBranchResponse;
import com.astami.backend.service.BranchService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/company/{companyId}/branch")
@RequiredArgsConstructor
public class BranchController {

    private final BranchService branchService;

    @GetMapping("{branchId}")
    public ResponseEntity<GetBranchResponse> getBranchById(
            @PathVariable("branchId") long branchId,
            Authentication authentication,
            @PathVariable("companyId") long companyId
    ) {
        return ResponseEntity.ok()
                .body(branchService.getBranchResponseById(branchId, companyId, authentication));
    }

    @PostMapping
    @PreAuthorize("hasRole('ENTREPRENEUR')")
    public ResponseEntity<CreateBranchResponse> createBranch(
            @RequestBody @Valid CreateBranchRequest body,
            @PathVariable("companyId") long companyId,
            Authentication authentication
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(branchService.createBranch(body, authentication, companyId));
    }

    @PutMapping("/{branchId}/last-requested-branch")
    public ResponseEntity<?> updateLastRequestedBranch(
            Authentication authentication,
            @PathVariable("branchId") long branchId,
            @PathVariable("companyId") long companyId
    ) {
        branchService.updateLastRequestedBranch(branchId, companyId, authentication);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(null);
    }
}
