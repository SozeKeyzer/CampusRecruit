package com.api.campusRecruit.service;

import com.api.campusRecruit.entity.Student;

import java.util.List;

public interface StudentService {
    public List<Student> getStudents();
    public Student getStudentById(int id);
    public Student getStudentByEmail(String email);

    public void addStudent(Student student);
    public void updateStudent(Student student);
}
