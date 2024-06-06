package com.astami.backend.service;

import com.astami.backend.dto.ServiceDto;
import com.astami.backend.exception.CustomNotFoundException;
import com.astami.backend.mapper.ServiceMapper;
import com.astami.backend.model.Branch;
import com.astami.backend.model.Service;
import com.astami.backend.payload.service.*;
import com.astami.backend.repository.ServiceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;

import java.util.List;

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

    public CreateServiceResponse addServiceToBranch(CreateServiceRequest body, long companyId, long branchId, Authentication authentication) {
        companyService.validateUserCompany(authentication, companyId);

        Branch branch = branchService.getBranchById(branchId);
        Service service = Service.builder()
                .title(body.title())
                .description(body.description())
                .price(body.price())
                .duration(body.duration())
                .build();


        service.setBranch(branch);
        service = serviceRepository.save(service);

        return CreateServiceResponse.builder()
                .service(ServiceMapper.mapToDto(service))
                .build();
    }

    public GetServicesResponse getServices(GetServicesRequest body) {
        companyService.validateUserCompany(body.getAuthentication(), body.getCompanyId());

        Page<Service> page = serviceRepository.findAllByTitleContainingIgnoreCaseAndBranchId(
                body.getTitle(),
                body.getBranchId(),
                PageRequest.of(body.getPage(), body.getSize(), Sort.by("id"))
        );

        List<ServiceDto> servicesResponse = page.getContent().stream()
                .map(ServiceMapper::mapToDto).toList();

        return GetServicesResponse.builder()
                .services(servicesResponse)
                .totalPages(page.getTotalPages())
                .totalElements(page.getTotalElements())
                .size(page.getSize())
                .currentPage(body.getPage())
                .isLast(page.isLast())
                .isFirst(page.isFirst())
                .build();
    }

    public void deleteServiceById(long serviceId, long companyId, Authentication authentication) {
        companyService.validateUserCompany(authentication, companyId);
        serviceRepository.deleteById(serviceId);
    }

    public UpdateServiceResponse updateServiceById(UpdateServiceRequest body, long serviceId, long companyId, Authentication authentication) {
        companyService.validateUserCompany(authentication, companyId);

        var service = serviceRepository.findById(serviceId)
                .orElseThrow(() -> new CustomNotFoundException("Услуга с идентификатором " + serviceId + " была не найдена"));

        if (body.getTitle() != null && !body.getTitle().isEmpty() && !body.getTitle().equals(service.getTitle())) {
            service.setTitle(body.getTitle());
        }

        if (body.getDescription() != null && !body.getDescription().isEmpty() && !body.getDescription().equals(service.getDescription())) {
            service.setDescription(body.getDescription());
        }

        if (body.getPrice() != -1 && body.getPrice() != service.getPrice()) {
            service.setPrice(body.getPrice());
        }

        if (body.getDuration() != -1 && body.getDuration() != service.getDuration()) {
            service.setDuration(body.getDuration());
        }

        service = serviceRepository.save(service);

        return UpdateServiceResponse.builder()
                .service(ServiceMapper.mapToDto(service))
                .build();
    }
}
