package com.astami.backend.mapper;

import com.astami.backend.dto.ServiceDto;
import com.astami.backend.model.Service;

public class ServiceMapper {

    public static ServiceDto mapToDto(Service service) {
        return ServiceDto.builder()
                .build();
    }
}
