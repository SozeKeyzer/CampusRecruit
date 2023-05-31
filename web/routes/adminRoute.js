const express=require('express');
const router=express.Router();
const adminController=require('../controller/adminController');

router.get("/adminDashboard",adminController.getAdminDashboard)

module.exports=router;