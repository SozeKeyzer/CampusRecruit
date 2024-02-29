const axios = require('axios');
const nodemailer = require('nodemailer');
const bcrypt = require('bcryptjs');
const pass_gen = require('../util/generator');
const logs = require('../util/logs'); //(messageType,messageLevel,Message)
const imgUrl=require('../util/imageSrc');

// 1: '[LOG]',
// 2: '[ERROR]',
// 3: '[FATAL_ERROR]'

module.exports = {
    getAdminLogin: (req, res) => {
        res.render('adminLogin');
    },
    getAdminDashboard: async (req, res) => {
        try {
            const response = await axios.get('http://localhost:9090/students');
            const students = response.data;
            const studentsWithStatusZero = students.filter(student => student.status === false);
            res.render('adminDashboard', {
                data: studentsWithStatusZero
            });
        } catch (error) {
            logs.logMessages(logs.direction[2], 0, error.message)
        }

    },
    getAdminJobPosting: async (req, res) => {
        try{
            const response=await axios.get('http://localhost:9090/jobPosting');
            const data=response.data;
            res.render('adminJobPosting',{data});
        }
        catch(error){
            console.lof(error);
        }
    },
    validateProfile: async (req, res) => {
        const studentId = req.query.studentId;
        try {
            const student = await axios.get(`http://localhost:9090/student/${studentId}`); //get the student with the id
            const body = student.data; //extract the data from response body object
            body.status = 1; //set its verfied status to 1
            try {
                const pass = pass_gen.genPass();   //generate the password here and update the student object and send the password via mail 
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
    },
    postJob:async (req,res)=>{
        try{
            const data=req.body;
        const com=data.company;
        data.imageUrl=imgUrl[com];
        await axios.post('http://localhost:9090/postJob',data);
        res.redirect('/adminJobPosting');
        }
        catch(error){
            console.log(error);
        }
    }
};