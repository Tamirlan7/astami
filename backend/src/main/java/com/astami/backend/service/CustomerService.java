package com.astami.backend.service;

import com.astami.backend.mapper.CustomerMapper;
import com.astami.backend.model.Customer;
import com.astami.backend.payload.customer.GetCustomersRequest;
import com.astami.backend.payload.customer.GetCustomersResponse;
import com.astami.backend.repository.CustomerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CustomerService {

    private final CustomerRepository customerRepository;
    private final CompanyService companyService;


    public GetCustomersResponse getCustomers(GetCustomersRequest body) {
        companyService.validateUserCompany(body.getAuthentication(), body.getCompanyId());

        Page<Customer> page = customerRepository.findAllByNameContainingIgnoreCaseAndBranchId(
                body.getName(),
                body.getBranchId(),
                PageRequest.of(body.getPage(), body.getSize(), Sort.by("id")));

        return GetCustomersResponse.builder()
                .customers(page.getContent().stream().map(CustomerMapper::mapToDto).toList())
                .totalPages(page.getTotalPages())
                .totalElements(page.getTotalElements())
                .size(page.getSize())
                .currentPage(body.getPage())
                .isLast(page.isLast())
                .isFirst(page.isFirst())
                .build();
    }
}
