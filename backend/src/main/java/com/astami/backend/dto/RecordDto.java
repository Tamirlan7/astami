package com.astami.backend.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@Builder
@AllArgsConstructor
public class RecordDto {
    private long id;
    private EmployeeDto employee;
    private ServiceDto service;

    @JsonFormat(pattern = "YYYY-MM-dd HH:mm:ss")
    private LocalDateTime dateTime;
    private CustomerDto customer;
}
