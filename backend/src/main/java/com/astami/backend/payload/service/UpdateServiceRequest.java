package com.astami.backend.payload.service;

import lombok.Data;

@Data
public class UpdateServiceRequest {
    private String title;
    private String description;
    private float price = -1f;
    private long duration = -1;
}
