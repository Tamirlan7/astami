package com.astami.backend.payload.customer;

import com.astami.backend.dto.CustomerDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetCustomersResponse {

    private List<CustomerDto> customers;
    private int totalPages;
    private long totalElements;
    private int size;
    private int currentPage;
    private boolean isLast;
    private boolean isFirst;

}
