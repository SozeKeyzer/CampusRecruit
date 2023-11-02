package com.api.campusRecruit.service;

import com.api.campusRecruit.dao.JobPostingDao;
import com.api.campusRecruit.entity.JobPosting;
import com.api.campusRecruit.entity.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class JobPostingServiceImpl implements JobPostingService{
    @Autowired
    JobPostingDao jobPostingDao;
    @Override
    public ResponseEntity<String> postJob(JobPosting jobPosting) {
        jobPostingDao.save(jobPosting);
        return ResponseEntity.status(HttpStatus.CREATED).body("Job Posted Successfully");
    }

    @Override
    public ResponseEntity<List<JobPosting>> getJobPosting() {
        List<JobPosting> jobPostings = jobPostingDao.findAll();
        if (jobPostings.isEmpty()) {
            return ResponseEntity.noContent().build();
        } else {
            return ResponseEntity.ok(jobPostings);
        }
    }
}
