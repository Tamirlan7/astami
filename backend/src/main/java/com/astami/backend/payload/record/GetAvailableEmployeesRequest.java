package com.astami.backend.payload.record;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetAvailableEmployeesRequest {
    private long serviceId;
    private LocalDateTime datetime;
}
