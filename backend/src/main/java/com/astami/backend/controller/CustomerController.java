package com.astami.backend.controller;

import com.astami.backend.payload.customer.GetCustomersRequest;
import com.astami.backend.payload.customer.GetCustomersResponse;
import com.astami.backend.service.CustomerService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/company/{companyId}/branch/{branchId}/customer")
@RequiredArgsConstructor
public class CustomerController {

    private final CustomerService customerService;

    @GetMapping
    public ResponseEntity<GetCustomersResponse> getCustomers(
            @RequestParam(name = "name", required = false, defaultValue = "") String name,
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "10") int size,
            @PathVariable("branchId") long branchId,
            @PathVariable("companyId") long companyId,
            Authentication authentication
    ) {
        return ResponseEntity.ok()
                .body(customerService.getCustomers(GetCustomersRequest.builder()
                        .authentication(authentication)
                        .name(name)
                        .page(page)
                        .size(size)
                        .branchId(branchId)
                        .companyId(companyId)
                        .build()));
    }

}
