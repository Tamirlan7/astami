package com.astami.backend.config;

import com.astami.backend.model.*;
import com.astami.backend.repository.*;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.Duration;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Arrays;

@Component
@RequiredArgsConstructor
public class AppInit implements CommandLineRunner {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;
    private final CompanyRepository companyRepository;
    private final FileRepository fileRepository;
    private final EmployeeRepository employeeRepository;
    private final ServiceRepository serviceRepository;

    @Override
    public void run(String... args) {
        User user = userRepository.save(
                User.builder()
                        .email("admin@gmail.com")
                        .phone("+77065461122")
                        .password(passwordEncoder.encode("admin12345"))
                        .role(Role.ROLE_ADMIN)
                        .build()
        );

        var company = Company.builder()
                .user(user)
                .title("test")
                .build();

        var branch = Branch.builder()
                .title("branch - 1")
                .country("Kazakhstan")
                .city("Astana")
                .build();

        var weekdays = Arrays.stream(Weekdays.values()).toList();

        var employee1 = Employee.builder()
                .fullName("Руслан")
                .age(22)
                .workdayStartTime(LocalTime.of(8, 0))
                .workdayEndTime(LocalTime.of(22, 0))
                .workDays(weekdays)
                .jobTitle("Младший Барбер")
                .description("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
                .build();

        var employee2 = Employee.builder()
                .fullName("Санжар")
                .age(25)
                .workdayStartTime(LocalTime.of(8, 0))
                .workdayEndTime(LocalTime.of(22, 0))
                .workDays(weekdays)
                .jobTitle("Старший Барбер")
                .description("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
                .build();

        employee2.setBranch(branch);
        employee1.setBranch(branch);

        var service1 = Service.builder()
                .title("Мужская стрижка - 3000")
                .price(3000)
                .duration(Duration.ofHours(1).toMillis())
                .description("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
                .build();

        service1.setBranch(branch);

        var service2 = Service.builder()
                .title("Мужская профессиональная стрижка - 5000")
                .price(5000)
                .duration(Duration.ofHours(1).plusMinutes(30).toMillis())
                .description("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")
                .build();

        service2.setBranch(branch);

        branch.setCompany(company);
        companyRepository.save(company);
        employeeRepository.saveAll(new ArrayList<>(Arrays.asList(employee1, employee2)));
        serviceRepository.saveAll(new ArrayList<>(Arrays.asList(service1, service2)));
    }
}
