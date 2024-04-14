import express from 'express';
const router=express.Router();
import * as studentController from '../controller/studentController.js';

router.get('/studentRegister',studentController.getStudentRegister);
router.get('/studentLogin',studentController.getStudentLogin);
router.get('/studentDashboard',studentController.getStudentDashboard);
router.get('/studentJobPosting',studentController.getStudentJobPosting);
router.get('/studentProfile',studentController.getStudentProfile);
router.post('/studentRegister',studentController.postStudentRegister);
router.post('/studentLogin',studentController.postStudentLogin);
router.post('/jobApplication/:id',studentController.postJobApplication);
router.get('/jobApplication/:id',studentController.getJobApplication);

export default router;