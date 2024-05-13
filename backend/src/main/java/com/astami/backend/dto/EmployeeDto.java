package com.astami.backend.dto;

import com.astami.backend.model.File;
import com.astami.backend.model.Service;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class EmployeeDto {
    private long id;
    private String fullName;
    private String description;
    private File image;
    private List<Service> services;
    private long branchId;
}
