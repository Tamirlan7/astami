package com.astami.backend.payload.employee;

import com.astami.backend.dto.EmployeeDto;
import com.astami.backend.dto.ServiceDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class GetEmployeeResponse {
    private EmployeeDto employee;
    private List<ServiceDto> assignedServices;
}
