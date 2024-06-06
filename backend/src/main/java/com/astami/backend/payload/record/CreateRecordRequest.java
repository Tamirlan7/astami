package com.astami.backend.payload.record;

import com.astami.backend.dto.CustomerDto;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.Data;

import java.time.LocalDateTime;

@Data
public class CreateRecordRequest {

    @NotNull
    @Positive
    private long serviceId;

    @NotNull
    @Positive
    private long employeeId;

    private CustomerDto customer;

    @NotNull
    private LocalDateTime datetime;

}
