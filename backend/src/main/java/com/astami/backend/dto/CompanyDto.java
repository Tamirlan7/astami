package com.astami.backend.dto;

import com.astami.backend.model.Branch;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CompanyDto {
    private long id;
    private String title;
    private long userId;
    private List<Branch> branches;
}
