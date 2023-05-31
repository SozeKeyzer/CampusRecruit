package com.api.campusRecruit.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "StudentData")
public class Student {
    @Id
    Long id;
    Long studentId;
    String studentName;
    String branch;
    String email;

    public Student() {

    }

    public Student(Long studentId, String studentName, String branch) {
        this.studentId = studentId;
        this.studentName = studentName;
        this.branch = branch;
    }

    public Long getStudentId() {
        return studentId;
    }

    public void setStudentId(Long studentId) {
        this.studentId = studentId;
    }

    public String getStudentName() {
        return studentName;
    }

    public void setStudentName(String studentName) {
        this.studentName = studentName;
    }

    public String getBranch() {
        return branch;
    }

    public void setBranch(String branch) {
        this.branch = branch;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }
}
