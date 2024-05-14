package com.astami.backend.controller;

import com.astami.backend.payload.service.AddServiceRequest;
import com.astami.backend.payload.service.AddServiceResponse;
import com.astami.backend.payload.service.GetServiceResponse;
import com.astami.backend.service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/company/{companyId}/branch/{branchId}/service")
@RequiredArgsConstructor
public class ServiceController {

    private final ServiceService serviceService;

    @PostMapping
    @PreAuthorize("hasRole('ENTREPRENEUR')")
    public ResponseEntity<AddServiceResponse> addServiceToBranch(
            @RequestBody AddServiceRequest body,
            @PathVariable("companyId") long companyId,
            @PathVariable("branchId") long branchId,
            Authentication authentication
    ) {
        return ResponseEntity.ok()
                .body(serviceService.addServiceToBranch(body, companyId, branchId, authentication));
    }


    @GetMapping("/{serviceId}")
    public ResponseEntity<GetServiceResponse> getServiceById(
            @PathVariable("companyId") long companyId,
            @PathVariable("serviceId") long serviceId,
            Authentication authentication
    ) {
        return ResponseEntity.ok()
                .body(serviceService.getServiceResponseById(serviceId, companyId, authentication));
    }
}
