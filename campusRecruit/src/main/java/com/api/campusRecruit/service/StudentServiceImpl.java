package com.api.campusRecruit.service;

import com.api.campusRecruit.dao.StudentDao;
import com.api.campusRecruit.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentServiceImpl implements StudentService{

    @Autowired
    StudentDao studentDao;
    @Override
    public List<Student> getStudents() {
        return studentDao.findAll();
    }

    @Override
    public Student getStudentById(int id) {
       return studentDao.findByStudentId(id);
    }

    @Override
    public Student getStudentByEmail(String email) {
        return studentDao.findByEmail(email);
    }

}
