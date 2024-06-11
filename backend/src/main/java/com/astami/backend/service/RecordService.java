package com.astami.backend.service;


import com.astami.backend.exception.CustomBadRequestException;
import com.astami.backend.mapper.EmployeeMapper;
import com.astami.backend.mapper.RecordMapper;
import com.astami.backend.model.*;
import com.astami.backend.model.Record;
import com.astami.backend.payload.record.*;
import com.astami.backend.payload.service.GetFreeTimesForRecordRequest;
import com.astami.backend.repository.CustomerRepository;
import com.astami.backend.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.transaction.annotation.Transactional;

import java.time.*;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class RecordService {

    private final RecordRepository recordRepository;
    private final EmployeeService employeeService;
    private final ServiceService serviceService;
    private final BranchService branchService;
    private final CustomerRepository customerRepository;
    private final CompanyService companyService;


    @Transactional
    public CreateRecordResponse createRecord(CreateRecordRequest body, long branchId) {
        var service = serviceService.getServiceById(body.getServiceId());
        var employee = employeeService.getEmployeeById(body.getEmployeeId());
        var branch = branchService.getBranchById(branchId);

        var customer = customerRepository.findByPhone(body.getCustomer().getPhone()).
                orElse(Customer.builder()
                        .email(body.getCustomer().getEmail())
                        .phone(body.getCustomer().getPhone())
                        .name(body.getCustomer().getName())
                        .build());

        customer.setBranch(branch);
        customerRepository.save(customer);

        var record = Record.builder()
                .dateTime(body.getDatetime())
                .build();

        record.setCustomer(customer);
        record.setEmployee(employee);
        record.setService(service);
        record.setBranch(branch);

        record = recordRepository.save(record);

        return CreateRecordResponse.builder()
                .record(RecordMapper.mapToDto(record))
                .build();
    }

    public GetRecordsResponse getRecords(GetRecordsRequest body) {
        companyService.validateUserCompany(body.getAuthentication(), body.getCompanyId());

        Page<Record> page = recordRepository.findAllByBranchId(
                body.getBranchId(),
                PageRequest.of(body.getPage(), body.getSize(), Sort.by("id")));

        return GetRecordsResponse.builder()
                .records(page.getContent().stream().map(RecordMapper::mapToDto).toList())
                .totalPages(page.getTotalPages())
                .totalElements(page.getTotalElements())
                .size(page.getSize())
                .currentPage(body.getPage())
                .isLast(page.isLast())
                .isFirst(page.isFirst())
                .build();
    }

    public GetAvailableEmployeesResponse getAvailableEmployees(GetAvailableEmployeesRequest request) {
        // Fetch the service by its ID
        Service service = serviceService.getServiceById(request.getServiceId());

        // Retrieve the list of employees providing the service
        List<Employee> employees = service.getEmployees();

        // Initialize the list to store available employees
        List<Employee> availableEmployees = new ArrayList<>();

        // Extract the selected time and calculate the end time based on service duration
        LocalDateTime selectedTime = request.getDatetime();
        Duration serviceDuration = Duration.ofMillis(service.getDuration());
        LocalDateTime endTime = selectedTime.plus(serviceDuration);

        // Iterate over each employee to check availability
        for (Employee employee : employees) {
            // Convert DayOfWeek to Weekdays enum
            Weekdays employeeWorkDay = convertToWeekday(selectedTime.getDayOfWeek());

            // Check if the employee works on the selected day and within working hours
            if (employee.getWorkDays().contains(employeeWorkDay) &&
                    !selectedTime.toLocalTime().isBefore(employee.getWorkdayStartTime()) &&
                    !endTime.toLocalTime().isAfter(employee.getWorkdayEndTime())) {

                // Check if the employee has any existing records at the selected time
                boolean isAvailable = recordRepository.findByEmployeeIdAndDateTimeBetween(employee.getId(), selectedTime, endTime).isEmpty();

                // If the employee is available, add to the list
                if (isAvailable) {
                    availableEmployees.add(employee);
                }
            }
        }

        return GetAvailableEmployeesResponse.builder()
                .employees(availableEmployees.stream().map(EmployeeMapper::mapToDto).toList())
                .build();
    }


    public List<String> getFreeTimesToRecord(GetFreeTimesForRecordRequest body) {
        // Fetch the service by its ID
        Service service = serviceService.getServiceById(body.getServiceId());
        DateTimeFormatter formatter = DateTimeFormatter.ofPattern("HH:mm");

        // Retrieve the list of employees providing the service
        List<Employee> employees = service.getEmployees();

        // Initialize the set to store free times
        Set<LocalDateTime> freeTimes = new HashSet<>();

        // Calculate the start and end of the day
        LocalDate date = body.getDate();
        LocalDateTime startOfTheDay = LocalDateTime.of(date, LocalTime.MIN);
        LocalDateTime endOfTheDay = LocalDateTime.of(date, LocalTime.MAX);

        // Calculate the duration of the service
        Duration serviceDuration = Duration.ofMillis(service.getDuration());

        // Check for existing records on the specified date and service
        List<Record> existingRecords = recordRepository.findByDateTimeBetweenAndServiceId(startOfTheDay, endOfTheDay, service.getId());
        Set<LocalDateTime> occupiedTimes = existingRecords.stream()
                .map(Record::getDateTime)
                .collect(Collectors.toSet());

        // Iterate over each employee to find free times
        for (Employee employee : employees) {
            // Convert DayOfWeek to Weekdays enum
            Weekdays employeeWorkDay = convertToWeekday(date.getDayOfWeek());

            // Check if the employee works on the specified day
            if (employee.getWorkDays().contains(employeeWorkDay)) {
                // Get the working hours of the employee
                LocalTime workdayStartTime = employee.getWorkdayStartTime();
                LocalTime workdayEndTime = employee.getWorkdayEndTime();

                // Calculate available time slots within the working hours of the employee
                LocalDateTime startTime = LocalDateTime.of(date, workdayStartTime);
                LocalDateTime endTime = LocalDateTime.of(date, workdayEndTime);
                List<LocalDateTime> employeeFreeTimes = calculateFreeTimes(startTime, endTime, serviceDuration);

                // Exclude occupied time slots from the available time slots
                employeeFreeTimes.removeAll(occupiedTimes);

                // Add the free time slots to the set
                freeTimes.addAll(employeeFreeTimes);
            }
        }

        // Convert the set to a list and format the times
        return freeTimes.stream().map(t -> t.format(formatter)).sorted().toList();
    }

    private Weekdays convertToWeekday(DayOfWeek dayOfWeek) {
        return switch (dayOfWeek) {
            case MONDAY -> Weekdays.MONDAY;
            case TUESDAY -> Weekdays.TUESDAY;
            case WEDNESDAY -> Weekdays.WEDNESDAY;
            case THURSDAY -> Weekdays.THURSDAY;
            case FRIDAY -> Weekdays.FRIDAY;
            case SATURDAY -> Weekdays.SATURDAY;
            case SUNDAY -> Weekdays.SUNDAY;
            default -> throw new CustomBadRequestException("Invalid day of week: " + dayOfWeek);
        };
    }

    private List<LocalDateTime> calculateFreeTimes(LocalDateTime startTime, LocalDateTime endTime, Duration serviceDuration) {
        List<LocalDateTime> freeTimes = new ArrayList<>();
        LocalDateTime current = startTime;

        // Iterate over time slots within the working hours
        while (current.plus(serviceDuration).isBefore(endTime) || current.plus(serviceDuration).isEqual(endTime)) {
            freeTimes.add(current);
            current = current.plusMinutes(serviceDuration.toMinutes());
        }

        return freeTimes;
    }
}