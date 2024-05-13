package com.astami.backend.payload.employee;

import com.astami.backend.dto.EmployeeDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class AddEmployeeResponse {
    private EmployeeDto employee;
}
