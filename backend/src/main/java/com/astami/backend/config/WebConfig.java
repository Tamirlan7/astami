package com.astami.backend.config;

import com.astami.backend.converter.StringToGenderEnumConverter;
import com.astami.backend.converter.StringToWeekdaysEnumConverter;
import org.springframework.context.annotation.Configuration;
import org.springframework.format.FormatterRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {
    @Override
    public void addFormatters(FormatterRegistry registry) {
        registry.addConverter(new StringToWeekdaysEnumConverter());
        registry.addConverter(new StringToGenderEnumConverter());
    }
}

