package com.api.campusRecruit.service;

import com.api.campusRecruit.entity.JobPosting;
import com.api.campusRecruit.entity.Student;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface JobPostingService {
    public ResponseEntity<String> postJob(JobPosting jobPosting);
    public ResponseEntity<List<JobPosting>>  getJobPosting();
}
