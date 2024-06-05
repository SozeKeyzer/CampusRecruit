import express from 'express';
const router=express.Router();
import * as studentController from '../controller/studentController.js';
import { multerFun } from '../config/multer.js';
import { auth } from '../middlewares/auth.js';
const upload = multerFun();

router.get('/studentRegister',studentController.getStudentRegister);
router.get('/studentLogin',studentController.getStudentLogin);
router.get('/studentDashboard',auth,studentController.getStudentDashboard);
router.get('/studentJobPosting',auth,studentController.getStudentJobPosting);
router.get('/studentProfile',auth,studentController.getStudentProfile);
router.post('/studentProfile',studentController.postStudentProfile);
router.post('/studentRegister',studentController.postStudentRegister);
router.post('/studentLogin',studentController.postStudentLogin);
router.post('/jobApplication',studentController.postJobApplication);
router.get('/jobApplication',auth,studentController.getJobApplication);
router.post('/upload',upload.single('resume'),studentController.uploadResume);
router.post('/changePassword',studentController.changePassword);
router.post('/studentLogout',studentController.logOut);

export default router;