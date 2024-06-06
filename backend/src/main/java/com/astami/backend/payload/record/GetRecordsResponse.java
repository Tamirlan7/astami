package com.astami.backend.payload.record;

import com.astami.backend.dto.RecordDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class GetRecordsResponse {
    private List<RecordDto> records;
    private int totalPages;
    private long totalElements;
    private int size;
    private int currentPage;
    private boolean isLast;
    private boolean isFirst;
}
