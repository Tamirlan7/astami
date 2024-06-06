package com.astami.backend.payload.record;

import com.astami.backend.dto.RecordDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class CreateRecordResponse {
    private RecordDto record;
}

