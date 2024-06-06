import {
  redirect
} from "react-router-dom";
import appliedJobsModel from "../model/appliedJobsModel.js";
import jobPostingModel from "../model/jobPostingModel.js";
import studentModel from "../model/studentModel.js";
import bcrypt from 'bcrypt';
import fs from "fs";
import {
  exec
} from "child_process";

export const getStudentLogin = (req, res) => {
  res.render('studentLogin');
}
export const getStudentRegister = (req, res) => {
  res.render('studentRegister');
}
//TODO : needs to find this only for particular studentid
export const getStudentDashboard = async (req, res) => {
  const data = await appliedJobsModel.find({
      studentId: req.session.user._id
    })
    .populate('studentId').populate('jobId').exec();
    const username = req.session.user.username;
  res.render('studentDashboard', {
    data,username
  });
}
export const getStudentJobPosting = async (req, res) => {
  try {
    const data = await jobPostingModel.find({});
    const username = req.session.user.username;
    res.render('studentJobPosting', {
      data,username
    });
  } catch (error) {
    console.log(error);
  }

}
export const getStudentProfile = async (req, res) => {
  const username = req.session.user.username;
  const data = await studentModel.findOne({
    studentId: req.session.user.studentId
  });
  res.render('studentProfile', {
    data: data,
    username
  });
}
export const postStudentProfile = async (req, res) => {
  const data = await studentModel.findOne({
    studentId: req.body.studentId
  });
  data.email = req.body.email;
  data.contact = req.body.contact;
  data.course = req.body.course;
  data.currentYear = req.body.currentYear;
  data.currentSem = req.body.currentSem;
  data.branch = req.body.branch;
  await data.save();
  res.redirect('/studentProfile');
}
export const postStudentLogin = async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const student = await studentModel.findOne({
    studentId: username
  });
  if (student) {
    const match = await bcrypt.compare(password, student.password);
    if (match) {
      req.session.isLoggedIn = true;
      req.session.user = student;
      req.session.isAdmin = false;
      req.session.save((err) => {
        res.redirect('/studentDashboard');
      });
    } else {
      res.redirect('/error');
    }
  } else {
    console.log('here');
    res.redirect('/error');
  }
}
export const postStudentRegister = async (req, res) => {
  try {
    await studentModel.create(req.body);
    res.render('postRegister');
  } catch (error) {
    console.log(error);
  }
}
export const postJobApplication = async (req, res) => {
  try {
    const job = await jobPostingModel.findOne({
      jobId: req.body.jobId
    });
    req.body.jobId = job._id;
    req.body.studentId = req.session.user._id;
    await appliedJobsModel.create(req.body);
    res.redirect('/studentJobPosting');
  } catch (error) {
    console.log(error)
  }
}
export const getJobApplication = async (req, res) => {
  const name = req.session.user.firstName + ' ' + req.session.user.lastName;
  const data = {
    id: req.query.id,
    result: null,
    name: name
  };
  res.render('studentJobApplication', {
    data
  });
}
export const uploadResume = async (req, res) => {
  exec('cd resume-model && python model.py', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return;
    }
    const name = req.session.user.firstName + ' ' + req.session.user.lastName;
    const data = {
      id: req.body.jobId,
      name: name
    };
    let rawdata = fs.readFileSync('C:/Users/mohit/Desktop/files/CampusRecruit/web/resume-model/Parsed_Resume.json');
    let result = JSON.parse(rawdata);
    data.result = result;
    res.render('studentJobApplication', {
      data
    });
  });
}
export const changePassword = async (req, res) => {
  const data = await studentModel.findOne({
    studentId: req.body.studentId
  });
  const match = await bcrypt.compare(req.body.currentPassword, data.password);
  if (match) {
    if (req.body.newPassword == req.body.confirmNewPassword) {
      const hashedPassword = await bcrypt.hash(req.body.newPassword, 12);
      data.password = hashedPassword;
      await data.save();
      res.redirect('/studentProfile');
    } else {
      res.redirect('/error');
    }
  } else {
    res.redirect('/error');
  }
}
export const logOut = async (req, res) => {
  req.session.isLoggedIn = false;
  req.session.destroy();
  res.redirect('/');
}