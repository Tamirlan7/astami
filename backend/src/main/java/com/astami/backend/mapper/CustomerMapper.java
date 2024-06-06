package com.astami.backend.mapper;

import com.astami.backend.dto.CustomerDto;
import com.astami.backend.model.Customer;

public class CustomerMapper {


    public static CustomerDto mapToDto(Customer customer) {
        if (customer == null) {
            return null;
        }

        return CustomerDto.builder()
                .phone(customer.getPhone())
                .email(customer.getEmail())
                .name(customer.getName())
                .build();
    }
}
