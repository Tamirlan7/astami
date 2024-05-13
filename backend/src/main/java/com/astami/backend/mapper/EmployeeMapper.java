package com.astami.backend.mapper;

import com.astami.backend.dto.EmployeeDto;
import com.astami.backend.model.Employee;

public class EmployeeMapper {
    public static EmployeeDto mapToDto(Employee employee) {
        return EmployeeDto.builder()
                .id(employee.getId())
                .image(employee.getImage())
                .description(employee.getDescription())
                .services(employee.getServices())
                .branchId(employee.getBranch().getId())
                .fullName(employee.getFullName())
                .build();
    }
}
