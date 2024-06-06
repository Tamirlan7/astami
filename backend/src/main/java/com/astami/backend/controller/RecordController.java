package com.astami.backend.controller;

import com.astami.backend.payload.record.*;
import com.astami.backend.payload.service.GetFreeTimesForRecordRequest;
import com.astami.backend.service.RecordService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/company/{companyId}/branch/{branchId}/record")
public class RecordController {

    private final RecordService recordService;

    @GetMapping
    public ResponseEntity<GetRecordsResponse> getEmployees(
            @RequestParam(name = "page", required = false, defaultValue = "0") int page,
            @RequestParam(name = "size", required = false, defaultValue = "10") int size,
            @PathVariable("branchId") long branchId,
            @PathVariable("companyId") long companyId,
            Authentication authentication
    ) {
        return ResponseEntity.ok()
                .body(recordService.getRecords(GetRecordsRequest.builder()
                        .size(size)
                        .page(page)
                        .companyId(companyId)
                        .authentication(authentication)
                        .branchId(branchId)
                        .build()));
    }

    @GetMapping("/free-times/service/{serviceId}")
    public ResponseEntity<List<String>> getFreeTimesToRecord(
            @PathVariable("serviceId") long serviceId,
            @RequestParam("date") LocalDate date
    ) {
        return ResponseEntity.ok()
                .body(recordService.getFreeTimesToRecord(GetFreeTimesForRecordRequest.builder()
                        .serviceId(serviceId)
                        .date(date)
                        .build()));
    }

    @GetMapping("/available-employees")
    public ResponseEntity<GetAvailableEmployeesResponse> getAvailableEmployees(
            @RequestParam("serviceId") long serviceId,
            @RequestParam("datetime") @DateTimeFormat(iso = DateTimeFormat.ISO.DATE_TIME) LocalDateTime datetime
    ) {
        return ResponseEntity.ok()
                .body(recordService.getAvailableEmployees(GetAvailableEmployeesRequest.builder()
                        .datetime(datetime)
                        .serviceId(serviceId)
                        .build()));
    }

    @PostMapping
    public ResponseEntity<CreateRecordResponse> createRecord(
            @RequestBody @Valid CreateRecordRequest body,
            @PathVariable long branchId
    ) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(recordService.createRecord(body, branchId));
    }

}
