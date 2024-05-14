package com.astami.backend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Time;
import java.time.Duration;
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
    private Duration duration;
    private Time availableFrom;
    private Time availableTo;
    private List<Long> employees;
    private long branchId;
}
