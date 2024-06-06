package com.astami.backend.payload.service;

import com.astami.backend.dto.ServiceDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Builder
@NoArgsConstructor
@AllArgsConstructor
@Data
public class GetServicesResponse {

    private List<ServiceDto> services;
    private int totalPages;
    private long totalElements;
    private int size;
    private int currentPage;
    private boolean isLast;
    private boolean isFirst;

}
