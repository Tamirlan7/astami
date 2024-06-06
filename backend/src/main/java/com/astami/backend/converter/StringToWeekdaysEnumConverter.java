package com.astami.backend.converter;

import com.astami.backend.exception.CustomBadRequestException;
import com.astami.backend.model.Weekdays;
import org.springframework.core.convert.converter.Converter;

public class StringToWeekdaysEnumConverter implements Converter<String, Weekdays> {

    @Override
    public Weekdays convert(String source) {
        try {
            return Weekdays.valueOf(source.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new CustomBadRequestException(e.getMessage());
        }
    }
}
