import { redirect } from "react-router-dom";
import appliedJobsModel from "../model/appliedJobsModel.js";
import jobPostingModel from "../model/jobPostingModel.js";
import studentModel from "../model/studentModel.js";
    // postStudentLogin:async (req, res) => {
    //     const email = req.body.email;
    //     const password = req.body.password;
    //     const data=await axios.get('http://localhost:9090/data');
            
    //     hrModel.findOne({
    //             where: {
    //                 emailId: email
    //             }
    //         }).then(user => {
    //             if (!user) {
    //                 console.log("User not found");
    //                 res.render('hrRegister', {
    //                     invalidDetails: false,
    //                     userNotFound: true,
    //                     userNotValidated: false
    //                 });
    //             } else {
    //                 if (user.password == null) {
    //                     res.render('hrRegister', {
    //                         invalidDetails: false,
    //                         userNotFound: false,
    //                         userNotValidated: true
    //                     });
    //                 }
    //                 const checkPass = bcrypt.compareSync(password, user.password.replaceAll('"', ''));
    //                 console.log(`Password Match ${checkPass}`);

    //                 if (checkPass == false) {
    //                     res.render('hrRegister', {
    //                         invalidDetails: true,
    //                         userNotFound: false,
    //                         userNotValidated: false
    //                     });
    //                 } else {
    //                     req.session.isLoggedIn = true;
    //                     req.session.userId = user.id;
    //                     req.session.username = user.userName;
    //                     req.session.email = user.emailId;
    //                     req.session.user = user;
    //                     console.log(`User Id is ${req.session.userId}`);

    //                     req.session.save((err) => {
    //                         console.log(err);
    //                         res.redirect('/hrDashboard');
    //                     });

    //                 }
    //             }
    //         })
    //         .catch(
    //             err => console.log(err)
    //         )
    // },
    // getLogout: (req, res) => {
    //     req.session.isLoggedIn = false;
    //     req.session.destroy();
    //     res.redirect('/');
    // }
   export const getStudentLogin=(req,res)=>{
        res.render('studentLogin');
    }
   export const getStudentRegister=(req,res)=>{
        res.render('studentRegister');
    }
    export const getStudentDashboard=(req,res)=>{
        res.render('studentDashboard');
    }
    export const getStudentJobPosting=async (req,res)=>{
      try{
        const data = await jobPostingModel.find({});
        res.render('studentJobPosting',{data});
      }
      catch(error){
        console.log(error);
      }
        
    }
    export const getStudentProfile=async (req,res)=>{
        // const response = await axios.get(`http://localhost:9090/student/200244`);
        //   const data = response.data;
        res.render('studentProfile',{
            // data:data
        });
    }
    export const postStudentLogin= async (req, res) => {
        // const id = req.body.username;
        // const password = req.body.password;
        // console.log(id);
      
        // try {
        //   const response = await axios.get(`http://localhost:9090/student/${id}`);
        //   const data = response.data;
        //   if(password==data.password){
        //     res.redirect('/studentDashboard');
        //   }
        // } catch (error) {
        //   console.error(error);
        // }
        res.redirect('/studentDashboard');
      }
      export const postStudentRegister=async (req,res)=>{
          try{
            await studentModel.create(req.body);
            res.render('postRegister');
          }
          catch(error){
            console.log(error);
          }
    }
    export const postJobApplication =async (req,res)=>{
      try{
        const job = await jobPostingModel.findOne({
          jobId:req.params.id
        });
        req.body.jobId = job._id;
        await appliedJobsModel.create(req.body);
        res.redirect('/studentJobPosting');
      }
      catch(error){
        console.log(error)
      }
    }
    export const getJobApplication = async (req,res) =>{
      res.render('studentJobApplication',{
        id:req.params.id
      });
    }