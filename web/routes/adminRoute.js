import express from 'express';
const router=express.Router();
import * as adminController from '../controller/adminController.js';

router.get('/adminLogin',adminController.getAdminLogin);
router.get('/adminDashboard',adminController.getAdminDashboard);
router.get('/adminJobPosting',adminController.getAdminJobPosting);
router.post('/validateProfile',adminController.validateProfile);
router.post('/postJob',adminController.postJob);

export default router;