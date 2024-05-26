package com.astami.backend.payload.employee;

import com.astami.backend.model.Employee;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetEmployeesResponse {
    List<Employee> employees;
    int totalPages;
    long totalElements;
    int pageSize;
}
