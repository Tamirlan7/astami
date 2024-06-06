package com.astami.backend.controller;

import com.astami.backend.payload.service.*;
import com.astami.backend.service.ServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
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
    public ResponseEntity<CreateServiceResponse> addServiceToBranch(
            @RequestBody CreateServiceRequest body,
            @PathVariable("companyId") long companyId,
            @PathVariable("branchId") long branchId,
            Authentication authentication
    ) {
        return ResponseEntity.ok()
                .body(serviceService.addServiceToBranch(body, companyId, branchId, authentication));
    }

    @GetMapping
    public ResponseEntity<GetServicesResponse> getServices(
            @RequestParam(name = "title", required = false, defaultValue = "") String title,
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "10") int size,
            @PathVariable("branchId") long branchId,
            @PathVariable("companyId") long companyId,
            Authentication authentication
    ) {
        return ResponseEntity.ok()
                .body(serviceService.getServices(GetServicesRequest.builder()
                        .title(title)
                        .page(page)
                        .size(size)
                        .authentication(authentication)
                        .branchId(branchId)
                        .companyId(companyId)
                        .build()));
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
    @PutMapping("/{serviceId}")
    public ResponseEntity<UpdateServiceResponse> updateServiceById(
            @RequestBody UpdateServiceRequest body,
            @PathVariable("companyId") long companyId,
            @PathVariable("serviceId") long serviceId,
            Authentication authentication
    ) {
        return ResponseEntity.ok()
                .body(serviceService.updateServiceById(body, serviceId, companyId, authentication));
    }

    @DeleteMapping("/{serviceId}")
    public ResponseEntity<?> deleteServiceById(
            @PathVariable("companyId") long companyId,
            @PathVariable("serviceId") long serviceId,
            Authentication authentication
    ) {
        serviceService.deleteServiceById(serviceId, companyId, authentication);

        return ResponseEntity.status(HttpStatus.OK)
                .body(null);
    }
}
