package com.astami.backend.payload.branch;

import com.astami.backend.dto.BranchDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class CreateBranchResponse {
    private BranchDto branch;
}
