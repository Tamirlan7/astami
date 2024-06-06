package com.astami.backend.model;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Table(name = "t_record")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "customer_id", nullable = false)
    private Customer customer;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "employee_id", nullable = false)
    private Employee employee;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "service_id", nullable = false)
    private Service service;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    private Branch branch;

    @Column(nullable = false)
    private LocalDateTime dateTime;

    public void setEmployee(Employee employee) {
        this.employee = employee;
        employee.getRecords().add(this);
    }

    public void setCustomer(Customer customer) {
        this.customer = customer;
        customer.getRecords().add(this);
    }

    public void setService(Service service) {
        this.service = service;
        service.getRecords().add(this);
    }

    public void setBranch(Branch branch) {
        this.branch = branch;
        branch.getRecords().add(this);
    }
}
