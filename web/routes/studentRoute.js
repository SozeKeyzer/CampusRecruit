const express=require('express');
const router=express.Router();
const studentController=require('../controller/studentController');

router.get('/studentRegister',studentController.getStudentRegister);
router.get('/studentLogin',studentController.getStudentLogin);

module.exports=router;