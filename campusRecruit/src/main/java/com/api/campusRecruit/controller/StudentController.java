package com.api.campusRecruit.controller;

import com.api.campusRecruit.entity.Student;
import com.api.campusRecruit.service.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping("/home")
    public String home(){
       return "this is my home";
    }

    @GetMapping("/students")
    public List<Student> getStudents(){
    return studentService.getStudents();
    }

    @GetMapping("/student/{id}")
    public Student getStudentById(@PathVariable String id){
        return studentService.getStudentById(Integer.parseInt(id));
    }

   @PostMapping("/student")
    public void addStudent(@RequestBody Student student){
         studentService.addStudent(student);
    }

   @PutMapping("/student")
   public void updateStudent(@RequestBody Student student){
        studentService.updateStudent(student);
   }
}
