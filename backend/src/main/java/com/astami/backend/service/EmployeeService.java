package com.astami.backend.service;

import com.astami.backend.exception.CustomBadRequestException;
import com.astami.backend.exception.CustomNotFoundException;
import com.astami.backend.mapper.EmployeeMapper;
import com.astami.backend.model.Branch;
import com.astami.backend.model.Employee;
import com.astami.backend.model.File;
import com.astami.backend.payload.employee.AddEmployeeRequest;
import com.astami.backend.payload.employee.AddEmployeeResponse;
import com.astami.backend.payload.employee.GetEmployeeResponse;
import com.astami.backend.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.Paths;

@RequiredArgsConstructor
@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final CompanyService companyService;
    private final BranchService branchService;
    private final FileService fileService;

    @Transactional
    public AddEmployeeResponse addEmployeeToBranch(AddEmployeeRequest body, long companyId, long branchId, Authentication authentication) {
        if (companyService.isUserAllowed(authentication, companyId)) {
            throw new CustomBadRequestException("User is not the owner of this company");
        }

        Branch branch = branchService.getBranchById(branchId);

        Employee employee = Employee.builder()
                .fullName(body.fullName())
                .description(body.description())
                .build();

        employee.setBranch(branch);
        employee = employeeRepository.save(employee);


        if (body.image() != null) {
            File employeeImage = fileService.saveFile(
                    body.image(),
                    Paths.get("employee", employee.getId().toString(), "avatar")
            );

            employee.setImage(employeeImage);
            employee = employeeRepository.save(employee);
        }

        return AddEmployeeResponse.builder()
                .employee(EmployeeMapper.mapToDto(employee))
                .build();
    }

    public GetEmployeeResponse getEmployeeResponseById(long employeeId, Authentication authentication, long companyId) {
        if (companyService.isUserAllowed(authentication, companyId)) {
            throw new CustomBadRequestException("User is not the owner of this company");
        }

        Employee employee = this.getEmployeeById(employeeId);

        return GetEmployeeResponse.builder()
                .employee(EmployeeMapper.mapToDto(employee))
                .build();
    }

    public Employee getEmployeeById(long employeeId) {
        return employeeRepository.findById(employeeId)
                .orElseThrow(() -> new CustomNotFoundException("Employee with id " + employeeId + " not found"));
    }
}
