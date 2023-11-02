package com.api.campusRecruit.controller;

import com.api.campusRecruit.entity.JobPosting;
import com.api.campusRecruit.service.JobPostingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@Controller
public class JobPostingController {
    @Autowired
    private JobPostingService jobPostingService;

    @PostMapping("/postJob")
    public ResponseEntity<String> postJob(@RequestBody JobPosting jobPosting){
        return jobPostingService.postJob(jobPosting);
    }
    @GetMapping("/jobPosting")
    public ResponseEntity<List<JobPosting>> getJobPosting(){
        return jobPostingService.getJobPosting();
    }
}
