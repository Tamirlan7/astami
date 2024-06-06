package com.astami.backend.validator;

import com.astami.backend.exception.CustomBadRequestException;
import com.astami.backend.model.Employee;

public class EmployeeValidator {

    public static void validate(Employee employee) {
        if (employee.getFullName().length() < 2) {
            throw new CustomBadRequestException("Поля fullName должен состоят как минимум из двух символов");
        }

        if (employee.getFullName().length() > 100) {
            throw new CustomBadRequestException("Поля fullName превышает лимит символов (максимум 100)");
        }

        if (employee.getJobTitle().length() < 2) {
            throw new CustomBadRequestException("Поля getJobTitle должен состоят как минимум из двух символов");
        }

        if (employee.getJobTitle().length() > 100) {
            throw new CustomBadRequestException("Поля getJobTitle превышает лимит символов (максимум 100)");
        }

        if (employee.getAge() < 6) {
            throw new CustomBadRequestException("Поля age должна быть больше либо равна 6");
        }

        if (employee.getDescription().length() > 5000) {
            throw new CustomBadRequestException("Поля description превышает лимит символов (максимум 5000)");
        }

        if (employee.getWorkdayStartTime().isAfter(employee.getWorkdayEndTime())) {
            throw new CustomBadRequestException("Поле getWorkdayStartTime время не может быть после времени указанного в поле getWorkdayEndTime");
        }

        if (employee.getWorkdayEndTime().isBefore(employee.getWorkdayStartTime())) {
            throw new CustomBadRequestException("Поле getWorkDayEndTime время не может быть до времени указанного в поле getWorkdayStartTime");
        }
    }

}
