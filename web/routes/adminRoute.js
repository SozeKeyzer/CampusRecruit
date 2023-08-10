const express=require('express');
const router=express.Router();
const adminController=require('../controller/adminController');

router.get('/adminLogin',adminController.getAdminLogin);
router.get('/adminDashboard',adminController.getAdminDashboard);
router.get('/adminJobPosting',adminController.getAdminJobPosting);
router.post('/validateProfile',adminController.validateProfile);

module.exports=router;