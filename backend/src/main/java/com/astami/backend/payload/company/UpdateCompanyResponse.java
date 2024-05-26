package com.astami.backend.payload.company;

import com.astami.backend.dto.CompanyDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@NoArgsConstructor
@Data
@AllArgsConstructor
public class UpdateCompanyResponse {

    private CompanyDto company;

}
