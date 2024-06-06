package com.astami.backend.repository;

import com.astami.backend.model.Record;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Repository
public interface RecordRepository extends JpaRepository<Record, Long> {

    Page<Record> findAllByBranchId(Long branchId, Pageable pageable);

    List<Record> findByDateTimeBetweenAndServiceId(LocalDateTime dateTime, LocalDateTime dateTime2, Long serviceId);

    Optional<Record> findByEmployeeIdAndDateTimeBetween(long employeeId, LocalDateTime dateTime, LocalDateTime dateTime2);

}
