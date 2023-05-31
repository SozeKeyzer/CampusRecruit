const express=require('express');
const router=express.Router();
const studentController=require('../controller/studentController');

router.get('/studentRegister',studentController.getStudentRegister);
router.get('/studentLogin',studentController.getStudentLogin);
router.get('/studentDashboard',studentController.getStudentDashboard);
router.get('/studentJobPosting',studentController.getStudentJobPosting);
router.get('/studentProfile',studentController.getStudentProfile);

module.exports=router;