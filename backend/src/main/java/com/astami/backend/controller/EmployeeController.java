package com.astami.backend.controller;

import com.astami.backend.payload.employee.AddEmployeeRequest;
import com.astami.backend.payload.employee.AddEmployeeResponse;
import com.astami.backend.payload.employee.GetEmployeeResponse;
import com.astami.backend.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/company/{companyId}/branch/{branchId}/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("{employeeId}")
    public ResponseEntity<GetEmployeeResponse> getEmployeeById(
            @PathVariable("employeeId") long employeeId,
            @PathVariable("companyId") long companyId,
            Authentication authentication
    ) {
        return ResponseEntity.ok()
                .body(employeeService.getEmployeeResponseById(employeeId, authentication, companyId));
    }

    @PostMapping(consumes = {MediaType.MULTIPART_FORM_DATA_VALUE})
    @PreAuthorize("hasRole('ENTREPRENEUR')")
    public ResponseEntity<AddEmployeeResponse> addEmployeeToBranch(
            @Valid AddEmployeeRequest body,
            @PathVariable("companyId") long companyId,
            @PathVariable("branchId") long branchId,
            Authentication authentication
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(employeeService.addEmployeeToBranch(body, companyId, branchId, authentication));
    }
}
