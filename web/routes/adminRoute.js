import express from 'express';
const router=express.Router();
import * as adminController from '../controller/adminController.js';
import { auth } from '../middlewares/auth.js';

router.get('/adminLogin',adminController.getAdminLogin);
router.post('/adminLogin',adminController.postAdminLogin);
router.get('/adminDashboard',auth,adminController.getAdminDashboard);
router.get('/adminJobPosting',auth,adminController.getAdminJobPosting);
router.post('/validateProfile',adminController.validateProfile);
router.post('/postJob',adminController.postJob);
router.get('/jobResponses',auth,adminController.getJobResponses);
router.get('/downloadResponses',auth,adminController.downloadResponses);
router.post('/deleteJob',adminController.deleteJob);
router.post('/adminLogout',adminController.logOut);

export default router;