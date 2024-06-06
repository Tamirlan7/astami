package com.astami.backend.payload.service;

import com.astami.backend.dto.ServiceDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class UpdateServiceResponse {
    private ServiceDto service;
}
