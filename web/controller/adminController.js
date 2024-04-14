import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import pass_gen from '../util/generator.js'
import imgSrc from '../util/imageSrc.js'
import studentModel from '../model/studentModel.js'
import { uniqueCode } from '../util/uniqueCode.js'
import jobPostingModel from '../model/jobPostingModel.js'
// import { uniqueCode } from '../util/uniqueCode.js'

export const getAdminLogin= (req, res) => {
        res.render('adminLogin');
    }
    export const getAdminDashboard= async (req, res) => {
        try {
            const data = await studentModel.find({
                verified:false
            });
            res.render('adminDashboard', {
                data: data
            });
        } catch (error) {
            console.log(error);
        }

    }
    export const getAdminJobPosting= async (req, res) => {
        try{
            const data = await jobPostingModel.find({});
            res.render('adminJobPosting',{
                data:data
            });
        }
        catch(error){
            console.log(error);
        }
    }
    export const validateProfile= async (req, res) => {
        const studentId = req.query.studentId;
        try {
            const student = await axios.get(`http://localhost:9090/student/${studentId}`); //get the student with the id
            const body = student.data; //extract the data from response body object
            body.status = 1; //set its verfied status to 1
            try {
                const pass = pass_gen();   //generate the password here and update the student object and send the password via mail 
                console.log(pass);
                const saltRounds = 12;
                const hashedPassword = await bcrypt.hash(pass, saltRounds);
                console.log(hashedPassword);
                body.password = hashedPassword;
                const msg = {
                    from: "tdemo651@gmail.com",
                    to: body.email,
                    subject: "Campus Recruit Profile Verified",
                    text: "Welcome to the platform!! Your profile has been verified by the admin, Password-" + pass
                };
                nodemailer.createTransport({
                        service: 'gmail',
                        auth: {
                            user: "tdemo651@gmail.com",
                            pass: "tedihyjmypzstvwq"
                        },
                        port: 465,
                        host: 'smtp.gmail.com'
                    })
                    .sendMail(msg, (err) => {
                        if (err) {
                            return console.log('error occur', err);
                        } else {
                            return console.log('email sent');
                        }
                    });
            } catch (error) {
                console.error('Error hashing password:', error);
                throw error;
            }
            const apiUrl = 'http://localhost:9090/student';  //after updating the object locally save it to the database
            const response = await axios.put(apiUrl, body);
            logs.logMessages(logs.direction[1], 0, "details updated");
            res.status(200).json({
                message: "Update successful"
            });
        } catch (error) {
            console.error('Error updating student details:', error.message);
            throw error;
        }
    }
    export const postJob=async (req,res)=>{
        try{
            const data = req.body;
            const com = data.company;
            data.imageUrl = imgSrc[com];
            data.jobId = uniqueCode();
            await jobPostingModel.create(data);
            res.redirect('/adminJobPosting');
        }
        catch(error){
            console.log(error);
        }
    }