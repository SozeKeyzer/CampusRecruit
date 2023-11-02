package com.api.campusRecruit.dao;

import com.api.campusRecruit.entity.JobPosting;
import org.springframework.data.jpa.repository.JpaRepository;

public interface JobPostingDao extends JpaRepository<JobPosting,Long> {

}
