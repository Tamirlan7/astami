package com.astami.backend.jwt;

import com.astami.backend.jwt.model.Token;
import com.astami.backend.jwt.service.JwtService;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.web.authentication.AuthenticationConverter;
import org.springframework.security.web.authentication.preauth.PreAuthenticatedAuthenticationToken;
import org.springframework.stereotype.Component;

import java.time.Instant;

@RequiredArgsConstructor
@Component
public class JwtAuthenticationConverter implements AuthenticationConverter {
    private final JwtService jwtService;

    @Override
    public Authentication convert(HttpServletRequest request) {
        String header = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (header != null && header.startsWith("Bearer ")) {
            String strFormatToken = header.substring(7);
            Token token = jwtService.deserializeToken(strFormatToken);

            if (token != null && Instant.now().isBefore(token.getExpiration())) {
                return new PreAuthenticatedAuthenticationToken(
                        token,
                        strFormatToken,
                        token.getRoles().stream().map(SimpleGrantedAuthority::new).toList()
                );
            }
        }

        return null;
    }
}
