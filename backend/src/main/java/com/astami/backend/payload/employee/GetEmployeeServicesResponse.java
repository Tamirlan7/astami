package com.astami.backend.payload.employee;

import com.astami.backend.dto.ServiceDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetEmployeeServicesResponse {
    private List<ServiceDto> services;
}
