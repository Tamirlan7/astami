package com.astami.backend.converter;

import com.astami.backend.exception.CustomBadRequestException;
import com.astami.backend.model.Gender;
import org.springframework.core.convert.converter.Converter;

public class StringToGenderEnumConverter implements Converter<String, Gender> {
    @Override
    public Gender convert(String source) {
        try {
            return Gender.valueOf(source.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new CustomBadRequestException(e.getMessage());
        }
    }
}
