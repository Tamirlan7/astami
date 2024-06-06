package com.astami.backend.payload.record;

import com.astami.backend.dto.EmployeeDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetAvailableEmployeesResponse {
    private List<EmployeeDto> employees;
}
