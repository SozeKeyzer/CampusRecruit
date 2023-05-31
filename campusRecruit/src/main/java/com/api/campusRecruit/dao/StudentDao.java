package com.api.campusRecruit.dao;

import com.api.campusRecruit.entity.Student;
import org.springframework.data.jpa.repository.JpaRepository;

public interface StudentDao extends JpaRepository<Student,Long> {
    Student findByStudentId(int id);
    Student findByEmail(String email);
}
