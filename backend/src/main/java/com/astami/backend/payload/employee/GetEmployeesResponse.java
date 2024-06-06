package com.astami.backend.payload.employee;

import com.astami.backend.dto.EmployeeDto;
import lombok.*;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetEmployeesResponse {
    private List<EmployeeDto> employees;
    private int totalPages;
    private long totalElements;
    private int size;
    private int currentPage;
    private boolean isLast;
    private boolean isFirst;
}
