package com.astami.backend.dto;

import com.astami.backend.model.File;
import com.astami.backend.model.Weekdays;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalTime;
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
    private List<Long> services;
    private long branchId;
    private int age;
    private String jobTitle;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime workdayStartTime;

    @JsonFormat(pattern = "HH:mm:ss")
    private LocalTime workdayEndTime;

    private List<Weekdays> workDays;
}
