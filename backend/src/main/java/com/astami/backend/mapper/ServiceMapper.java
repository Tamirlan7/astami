package com.astami.backend.mapper;

import com.astami.backend.dto.ServiceDto;
import com.astami.backend.model.Employee;
import com.astami.backend.model.Service;

public class ServiceMapper {

    public static ServiceDto mapToDto(Service service) {
        if (service == null) {
            return null;
        }

        return ServiceDto.builder()
                .id(service.getId())
                .title(service.getTitle())
                .description(service.getDescription())
                .price(service.getPrice())
                .availableFrom(service.getAvailableFrom())
                .availableTo(service.getAvailableTo())
                .duration(service.getDuration())
                .employees(service.getEmployees().stream().map(Employee::getId).toList())
                .build();
    }
}
