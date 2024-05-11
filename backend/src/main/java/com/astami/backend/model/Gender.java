package com.astami.backend.model;

import com.astami.backend.deserializer.GenderDeserializer;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;

@JsonDeserialize(using = GenderDeserializer.class)
public enum Gender {
    MALE,
    FEMALE,
}
