package com.astami.backend.service;

import com.astami.backend.exception.CustomNotFoundException;
import com.astami.backend.mapper.EmployeeMapper;
import com.astami.backend.model.Branch;
import com.astami.backend.model.Employee;
import com.astami.backend.model.File;
import com.astami.backend.payload.employee.*;
import com.astami.backend.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
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
        companyService.validateUserCompany(authentication, companyId);

        Branch branch = branchService.getBranchById(branchId);

        Employee employee = Employee.builder()
                .fullName(body.fullName())
                .description(body.description())
                .jobTitle(body.jobTitle())
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
        companyService.validateUserCompany(authentication, companyId);

        Employee employee = this.getEmployeeById(employeeId);

        return GetEmployeeResponse.builder()
                .employee(EmployeeMapper.mapToDto(employee))
                .build();
    }

    public Employee getEmployeeById(long employeeId) {
        return employeeRepository.findById(employeeId)
                .orElseThrow(() -> new CustomNotFoundException("Employee with id " + employeeId + " not found"));
    }

    public Page<Employee> getEmployees(GetEmployeesRequest body) {
        companyService.validateUserCompany(body.getAuthentication(), body.getCompanyId());

        Page<Employee> page = employeeRepository.findAllByFullNameAndBranchId(
                body.getName(),
                body.getBranchId(),
                PageRequest.of(body.getPage(), body.getSize(), Sort.by("id")));

        return page;
    }
}
