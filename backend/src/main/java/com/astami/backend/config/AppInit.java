package com.astami.backend.config;

import com.astami.backend.model.Gender;
import com.astami.backend.repository.UserRepository;
import com.astami.backend.model.Role;
import com.astami.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.CommandLineRunner;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Component;

import java.time.LocalDate;

@Component
@RequiredArgsConstructor
public class AppInit implements CommandLineRunner {

    private final PasswordEncoder passwordEncoder;
    private final UserRepository userRepository;

    @Override
    public void run(String... args) {
        if (userRepository.findByEmail("admin@gmail.com").isEmpty()) {
            userRepository.save(
                    User.builder()
                            .email("admin@gmail.com")
                            .phone("+77065461122")
                            .firstName("admin")
                            .lastName("admin")
                            .birthDate(LocalDate.of(2006, 7, 21))
                            .gender(Gender.MALE)
                            .password(passwordEncoder.encode("admin12345"))
                            .role(Role.ROLE_ADMIN)
                            .build()
            );
        }
    }
}
