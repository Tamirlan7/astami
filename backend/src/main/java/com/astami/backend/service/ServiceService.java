package com.astami.backend.service;

import com.astami.backend.exception.CustomBadRequestException;
import com.astami.backend.exception.CustomNotFoundException;
import com.astami.backend.mapper.ServiceMapper;
import com.astami.backend.model.Branch;
import com.astami.backend.model.Service;
import com.astami.backend.payload.service.AddServiceRequest;
import com.astami.backend.payload.service.AddServiceResponse;
import com.astami.backend.payload.service.GetServiceResponse;
import com.astami.backend.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServiceService {

    private final ServiceRepository serviceRepository;
    private final CompanyService companyService;
    private final BranchService branchService;

    public GetServiceResponse getServiceResponseById(long serviceId, long companyId, Authentication authentication) {
        companyService.validateUserCompany(authentication, companyId);

        Service service = this.getServiceById(serviceId);

        return GetServiceResponse.builder()
                .service(ServiceMapper.mapToDto(service))
                .build();
    }

    private Service getServiceById(long serviceId) {
        return serviceRepository.findById(serviceId)
                .orElseThrow(() -> new CustomNotFoundException("Service with id " + serviceId + " not found"));
    }

    public AddServiceResponse addServiceToBranch(AddServiceRequest body, long companyId, long branchId, Authentication authentication) {
        companyService.validateUserCompany(authentication, companyId);

        Branch branch = branchService.getBranchById(branchId);
        Service service = Service.builder()
                .title(body.title())
                .description(body.description())
                .price(body.price())
                .duration(body.duration())
                .availableFrom(body.availableFrom())
                .availableTo(body.availableTo())
                .build();

        service.setBranch(branch);
        service = serviceRepository.save(service);

        return AddServiceResponse.builder()
                .service(ServiceMapper.mapToDto(service))
                .build();
    }
}
