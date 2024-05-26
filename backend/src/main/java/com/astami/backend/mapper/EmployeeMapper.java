package com.astami.backend.mapper;

import com.astami.backend.dto.EmployeeDto;
import com.astami.backend.model.Employee;
import com.astami.backend.model.Service;

public class EmployeeMapper {
    public static EmployeeDto mapToDto(Employee employee) {
        if (employee == null) {
            return null;
        }

        return EmployeeDto.builder()
                .id(employee.getId())
                .image(employee.getImage())
                .description(employee.getDescription())
                .services(employee.getServices().stream().map(Service::getId).toList())
                .branchId(employee.getBranch().getId())
                .fullName(employee.getFullName())
                .build();
    }
}
