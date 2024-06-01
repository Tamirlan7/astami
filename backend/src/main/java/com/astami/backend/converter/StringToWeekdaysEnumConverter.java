package com.astami.backend.converter;

import com.astami.backend.model.Weekdays;
import org.springframework.core.convert.converter.Converter;

public class StringToEnumConverter implements Converter<String, Weekdays> {

    @Override
    public Weekdays convert(String source) {
        return Weekdays.valueOf(source.toUpperCase());
    }
}
