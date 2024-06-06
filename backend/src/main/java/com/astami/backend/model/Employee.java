package com.astami.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_employee")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "full_name", nullable = false, length = 100)
    private String fullName;

    @OneToOne(fetch = FetchType.EAGER)
    private File image;

    @Column(nullable = false)
    private int age;

    @Column(name = "description", length = 5000)
    private String description;

    @Column(name = "job_title", nullable = false)
    private String jobTitle;

    @Builder.Default
    @JsonIgnore
    @ElementCollection(targetClass = Weekdays.class, fetch = FetchType.LAZY)
    @CollectionTable(name = "t_employee_work_days", joinColumns = @JoinColumn(name = "employee_id"))
    @Column(name = "work_day", nullable = false, length = 9)
    private List<Weekdays> workDays = new ArrayList<>();

    @Column(nullable = false)
    private LocalTime workdayStartTime;

    @Column(nullable = false)
    private LocalTime workdayEndTime;

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "t_service_employee",
            joinColumns = @JoinColumn(name = "employee_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "service_id", referencedColumnName = "id")
    )
    @Builder.Default
    @ToString.Exclude
    private List<Service> services = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    @JsonIgnore
    @ToString.Exclude
    private Branch branch;

    @JsonIgnore
    @Builder.Default
    @OneToMany(mappedBy = "employee", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    @ToString.Exclude
    private List<Record> records = new ArrayList<>();

    public void setBranch(Branch branch) {
        this.branch = branch;
        this.branch.getEmployees().add(this);
    }
}
