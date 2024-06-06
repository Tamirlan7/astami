package com.astami.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@Builder
public class ServiceDto {
    private long id;
    private String title;
    private String description;
    private float price;
    private long duration;
    private List<Long> employees;
    private long branchId;
}
