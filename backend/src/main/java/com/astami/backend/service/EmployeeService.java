package com.astami.backend.service;

import com.astami.backend.exception.CustomNotFoundException;
import com.astami.backend.mapper.EmployeeMapper;
import com.astami.backend.mapper.ServiceMapper;
import com.astami.backend.model.*;
import com.astami.backend.payload.employee.*;
import com.astami.backend.repository.EmployeeRepository;
import com.astami.backend.repository.ServiceRepository;
import com.astami.backend.validator.EmployeeValidator;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.core.io.Resource;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.security.core.Authentication;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@org.springframework.stereotype.Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final CompanyService companyService;
    private final BranchService branchService;
    private final FileService fileService;
    private final ServiceRepository serviceRepository;

    @Transactional
    public AddEmployeeResponse addEmployeeToBranch(@Valid CreateEmployeeRequest body, long companyId, long branchId, Authentication authentication) {
        companyService.validateUserCompany(authentication, companyId);

        Branch branch = branchService.getBranchById(branchId);

        // Ensure workDays is mutable
        List<Weekdays> workDays = new ArrayList<>(body.getWorkDays());

        Employee employee = Employee.builder()
                .fullName(body.getFullName())
                .description(body.getDescription())
                .jobTitle(body.getJobTitle())
                .workDays(workDays)
                .workdayStartTime(body.getWorkdayStartTime())
                .workDayEndTime(body.getWorkdayEndTime())
                .age(body.getAge())
                .build();

        employee.setBranch(branch);
        employee = employeeRepository.save(employee);

        if (body.getImage() != null) {
            File employeeImage = fileService.saveFile(
                    body.getImage(),
                    Paths.get("employee", employee.getId().toString(), "avatar")
            );

            employee.setImage(employeeImage);
            employee = employeeRepository.save(employee);
        }

        // Assign services if any
        if (body.getAssignedServicesIds() != null) {
            List<Service> services = serviceRepository.findAllById(body.getAssignedServicesIds());
            employee.getServices().addAll(services);
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
                .assignedServices(employee.getServices().stream().map(ServiceMapper::mapToDto).toList())
                .build();
    }

    public Employee getEmployeeById(long employeeId) {
        return employeeRepository.findById(employeeId)
                .orElseThrow(() -> new CustomNotFoundException("Сотрудник с идентификатором " + employeeId + " не найден."));
    }

    public GetEmployeesResponse getEmployees(GetEmployeesRequest body) {
        companyService.validateUserCompany(body.getAuthentication(), body.getCompanyId());

        Page<Employee> page = employeeRepository.findAllByFullNameContainingIgnoreCaseAndBranchId(
                body.getName(),
                body.getBranchId(),
                PageRequest.of(body.getPage(), body.getSize(), Sort.by("id")));

        return GetEmployeesResponse.builder()
                .employees(page.getContent().stream().map(EmployeeMapper::mapToDto).toList())
                .totalPages(page.getTotalPages())
                .totalElements(page.getTotalElements())
                .size(page.getSize())
                .currentPage(body.getPage())
                .isLast(page.isLast())
                .isFirst(page.isFirst())
                .build();
    }

    public Resource getEmployeeFiles(GetEmployeeFilesRequest body) {
        companyService.validateUserCompany(body.getAuthentication(), body.getCompanyId());

        return fileService.load(
                Paths.get(
                        "files",
                        "employee",
                        String.valueOf(body.getEmployeeId()),
                        "avatar",
                        body.getFileName()
                )
        );
    }

    @Transactional
    public UpdateEmployeeResponse updateEmployee(UpdateEmployeeRequest body, long employeeId, long branchId, long companyId, Authentication authentication) {
        companyService.validateUserCompany(authentication, companyId);

        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new CustomNotFoundException("Сотрудник с идентификатором " + employeeId + " был не найден"));

        if (body.getFullName() != null && !body.getFullName().isEmpty() && !body.getFullName().equals(employee.getFullName())) {
            employee.setFullName(body.getFullName());
        }

        if (body.getImage() != null) {
            File employeeImage = fileService.saveFile(
                    body.getImage(),
                    Paths.get("employee", employee.getId().toString(), "avatar")
            );

            employee.setImage(employeeImage);
            employee = employeeRepository.save(employee);
        }

        if (body.isDeleteImage()) {
            employee.setImage(null);
        }

        if (body.getDescription() != null && !body.getDescription().isEmpty() && !body.getDescription().equals(employee.getDescription())) {
            employee.setDescription(body.getDescription());
        }

        if (body.getJobTitle() != null && !body.getJobTitle().isEmpty() && !body.getJobTitle().equals(employee.getJobTitle())) {
            employee.setJobTitle(body.getJobTitle());
        }

        if (body.getWorkdayStartTime() != null && !body.getWorkdayStartTime().equals(employee.getWorkdayStartTime())) {
            employee.setWorkdayStartTime(body.getWorkdayStartTime());
        }

        if (body.getWorkdayEndTime() != null && !body.getWorkdayEndTime().equals(employee.getWorkDayEndTime())) {
            employee.setWorkDayEndTime(body.getWorkdayEndTime());
        }

        if (body.getAge() != -1 && body.getAge() != employee.getAge()) {
            employee.setAge(body.getAge());
        }

        if (body.getWorkDays() != null && !body.getWorkDays().isEmpty() && !body.getWorkDays().equals(employee.getWorkDays())) {
            employee.setWorkDays(body.getWorkDays());
        }

        if (body.getAssignedServicesIds() != null && !body.getAssignedServicesIds().isEmpty()) {
            List<Service> requestedServices = serviceRepository.findAllById(body.getAssignedServicesIds());

            employee.setServices(new ArrayList<>(requestedServices));
        }

        EmployeeValidator.validate(employee);
        employee = employeeRepository.save(employee);

        return UpdateEmployeeResponse.builder()
                .employee(EmployeeMapper.mapToDto(employee))
                .assignedServices(employee.getServices().stream().map(ServiceMapper::mapToDto).toList())
                .build();
    }
}
