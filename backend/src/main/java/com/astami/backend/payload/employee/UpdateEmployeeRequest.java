package com.astami.backend.payload.employee;

import com.astami.backend.model.Weekdays;
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
public class UpdateEmployeeRequest {

    private String fullName;

    private String description;

    private MultipartFile image;

    private String jobTitle;

    private int age = -1;

    private LocalTime workdayStartTime;

    private LocalTime workdayEndTime;

    private List<Weekdays> workDays = new ArrayList<>();

    private List<Long> assignedServicesIds = new ArrayList<>();

    private boolean deleteImage = false;
}
