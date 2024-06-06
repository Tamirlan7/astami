package com.astami.backend.controller;

import com.astami.backend.model.Weekdays;
import com.astami.backend.payload.employee.*;
import com.astami.backend.service.EmployeeService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/company/{companyId}/branch/{branchId}/employee")
public class EmployeeController {

    private final EmployeeService employeeService;

    @GetMapping("/{employeeId}")
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
            @RequestParam("workDays[]") List<Weekdays> workDays,
            @RequestParam("fullName") String fullName,
            @RequestParam("age") int age,
            @RequestParam("jobTitle") String jobTitle,
            @RequestParam("description") String description,
            @RequestParam(value = "image", required = false) MultipartFile image,
            @RequestParam("workdayStartTime") LocalTime workdayStartTime,
            @RequestParam("workdayEndTime") LocalTime workdayEndTime,
            @RequestParam(value = "assignedServicesIds[]", required = false) List<Long> assignedServicesIds,
            @PathVariable("companyId") long companyId,
            @PathVariable("branchId") long branchId,
            Authentication authentication
    ) {

        CreateEmployeeRequest body = CreateEmployeeRequest.builder()
                .workDays(workDays)
                .age(age)
                .description(description)
                .image(image)
                .jobTitle(jobTitle)
                .workdayStartTime(workdayStartTime)
                .workdayEndTime(workdayEndTime)
                .fullName(fullName)
                .build();

        if (assignedServicesIds != null) {
            body.setAssignedServicesIds(assignedServicesIds);
        }

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(employeeService.addEmployeeToBranch(body, companyId, branchId, authentication));
    }

    @GetMapping("/{employeeId}/file/{fileName}")
    public ResponseEntity<Resource> getEmployeeFile(
            @PathVariable("employeeId") long employeeId,
            @PathVariable("fileName") String fileName,
            Authentication authentication,
            @PathVariable("companyId") long companyId

    ) {
        return ResponseEntity.ok()
                .body(employeeService.getEmployeeFiles(GetEmployeeFilesRequest.builder()
                        .companyId(companyId)
                        .authentication(authentication)
                        .employeeId(employeeId)
                        .fileName(fileName)
                        .build()));
    }

    @GetMapping
    public ResponseEntity<GetEmployeesResponse> getEmployees(
            @RequestParam(name = "name", required = false, defaultValue = "") String name,
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "10") int size,
            @PathVariable("branchId") long branchId,
            @PathVariable("companyId") long companyId,
            Authentication authentication
    ) {
        return ResponseEntity.ok()
                .body(employeeService.getEmployees(GetEmployeesRequest.builder()
                        .size(size)
                        .page(page)
                        .companyId(companyId)
                        .authentication(authentication)
                        .branchId(branchId)
                        .name(name)
                        .build()));
    }

    @PutMapping("/{employeeId}")
    public ResponseEntity<UpdateEmployeeResponse> updateEmployee(
            UpdateEmployeeRequest body,
            @PathVariable("employeeId") long employeeId,
            @PathVariable("branchId") long branchId,
            @PathVariable("companyId") long companyId,
            Authentication authentication
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(employeeService.updateEmployee(body, employeeId, branchId, companyId, authentication));
    }
    @DeleteMapping("/{employeeId}")
    public ResponseEntity<?> updateEmployee(
            @PathVariable("employeeId") long employeeId,
            @PathVariable("branchId") long branchId,
            @PathVariable("companyId") long companyId,
            Authentication authentication
    ) {
        employeeService.deleteEmployeeById(employeeId, branchId, companyId, authentication);
        return ResponseEntity.status(HttpStatus.OK)
                .body(null);
    }
}
