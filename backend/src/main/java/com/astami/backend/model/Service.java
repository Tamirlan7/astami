package com.astami.backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import jakarta.validation.constraints.PositiveOrZero;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.antlr.v4.runtime.misc.Interval;

import java.sql.Time;
import java.time.Duration;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "t_service")
@NoArgsConstructor
@AllArgsConstructor
@Data
@Builder
public class Service {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false, length = 100)
    private String title;

    @Column(name = "description", length = 500)
    private String description;

    @PositiveOrZero
    @Column(name = "price", nullable = false)
    @Builder.Default
    private float price = 0f;

    @Builder.Default
    @Column(name = "duration", nullable = false)
    private Duration duration = Duration.ofHours(1);

    @Column(name = "available_from", nullable = false)
    private Time availableFrom; // a service available from

    @Column(name = "available_to", nullable = false)
    private Time availableTo; // a service available to

    @JsonIgnore
    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(
            name = "t_service_employee",
            joinColumns = @JoinColumn(name = "service_id", referencedColumnName = "id"),
            inverseJoinColumns = @JoinColumn(name = "employee_id", referencedColumnName = "id")
    )
    @Builder.Default
    private List<Employee> employees = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "branch_id", nullable = false)
    @JsonIgnore
    private Branch branch;

    public void setBranch(Branch branch) {
        this.branch = branch;
        this.branch.getServices().add(this);
    }

}
