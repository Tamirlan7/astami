package com.astami.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class BranchDto {
    private long id;
    private String title;
    private String city;
    private String country;
    private long companyId;
    private List<EmployeeDto> employees;
}
