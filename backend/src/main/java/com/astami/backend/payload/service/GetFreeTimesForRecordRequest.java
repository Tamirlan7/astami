package com.astami.backend.payload.service;

import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDate;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetFreeTimesForRecordRequest {
    @NotNull
    @Positive
    private long serviceId;

    @NotNull
    private LocalDate date;
}
