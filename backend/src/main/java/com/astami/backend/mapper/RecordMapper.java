package com.astami.backend.mapper;

import com.astami.backend.dto.RecordDto;
import com.astami.backend.model.Record;

public class RecordMapper {

    public static RecordDto mapToDto(Record record) {
        if (record == null) {
            return null;
        }

        return RecordDto.builder()
                .id(record.getId())
                .service(ServiceMapper.mapToDto(record.getService()))
                .employee(EmployeeMapper.mapToDto(record.getEmployee()))
                .dateTime(record.getDateTime())
                .customer(CustomerMapper.mapToDto(record.getCustomer()))
                .build();
    }

}
