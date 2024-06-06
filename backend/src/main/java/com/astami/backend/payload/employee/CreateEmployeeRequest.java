package com.astami.backend.payload.employee;

import com.astami.backend.model.Weekdays;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.PositiveOrZero;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateEmployeeRequest {

    @NotBlank
    @Size(min = 2, max = 100)
    private String fullName;

    @Size(max = 5000)
    private String description;

    @NotNull
    private MultipartFile image;

    @NotBlank
    private String jobTitle;

    @NotNull
    @PositiveOrZero
    private int age;

    @NotNull
    private LocalTime workdayStartTime;

    @NotNull
    private LocalTime workdayEndTime;

    @NotNull
    @Size(min = 1, max = 7)
    private List<Weekdays> workDays = new ArrayList<>();

    private List<Long> assignedServicesIds = new ArrayList<>();
}
