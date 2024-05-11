package com.astami.backend.config;

import com.astami.backend.exception.CustomNotFoundException;
import com.astami.backend.jwt.model.Token;
import com.astami.backend.model.CustomUserDetails;
import com.astami.backend.repository.UserRepository;
import com.astami.backend.model.User;
import lombok.RequiredArgsConstructor;
import org.springframework.security.core.userdetails.AuthenticationUserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;


@RequiredArgsConstructor
@Component
public class JwtAuthenticationUserDetailsService implements AuthenticationUserDetailsService<PreAuthenticatedAuthenticationToken> {

    private final UserRepository userRepository;

    @Override
    public UserDetails loadUserDetails(PreAuthenticatedAuthenticationToken token) throws UsernameNotFoundException {
        if (token.getPrincipal() instanceof Token accessToken) {
            User user = userRepository.findById(accessToken.getUserId())
                    .orElseThrow(() -> new CustomNotFoundException("User with id " + accessToken.getUserId() + " not found"));

            return CustomUserDetails.builder()
                    .role(user.getRole())
                    .username(user.getPhone())
                    .password(user.getPassword())
                    .build();
        }

        return null;
    }
}
