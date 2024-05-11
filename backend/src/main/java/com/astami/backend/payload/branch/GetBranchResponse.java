package com.astami.backend.payload.branch;

import com.astami.backend.dto.BranchDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class GetBranchResponse {
    private BranchDto branch;
}
