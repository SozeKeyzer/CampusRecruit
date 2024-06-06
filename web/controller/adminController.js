import nodemailer from 'nodemailer'
import bcrypt from 'bcrypt'
import pass_gen from '../util/generator.js'
import imgSrc from '../util/imageSrc.js'
import studentModel from '../model/studentModel.js'
import {
    uniqueCode
} from '../util/uniqueCode.js'
import jobPostingModel from '../model/jobPostingModel.js'
import appliedJobsModel from '../model/appliedJobsModel.js'
import ExcelJS from 'exceljs';
// import { uniqueCode } from '../util/uniqueCode.js'

export const getAdminLogin = (req, res) => {
    res.render('adminLogin');
}
export const getAdminDashboard = async (req, res) => {
    try {
        const data = await studentModel.find({
            verified: false
        });
        res.render('adminDashboard', {
            data: data
        });
    } catch (error) {
        console.log(error);
    }

}
export const getAdminJobPosting = async (req, res) => {
    try {
        const data = await jobPostingModel.find({});
        res.render('adminJobPosting', {
            data: data
        });
    } catch (error) {
        console.log(error);
    }
}
export const validateProfile = async (req, res) => {
    try {
        const studentId = req.query.studentId;
        console.log(studentId);
        const student = await studentModel.findOne({
            studentId: studentId
        }); //get the student with the id
        student.verified = true; 
        try {
            const pass = pass_gen(); 
            console.log(pass);
            const saltRounds = 12;
            const hashedPassword = await bcrypt.hash(pass, saltRounds);
            console.log(hashedPassword);
            student.password = hashedPassword;
            const msg = {
                from: "tdemo651@gmail.com",
                to: student.email,
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
            await student.save();
            res.redirect('/adminDashboard');
        } catch (error) {
            console.error('Error hashing password:', error);
            throw error;
        }
    } catch (error) {
        console.error('Error updating student details:', error.message);
        throw error;
    }
}
export const postJob = async (req, res) => {
    try {
        const data = req.body;
        const com = data.company;
        data.imageUrl = imgSrc[com];
        data.jobId = uniqueCode();
        await jobPostingModel.create(data);
        //html content
        const htmlContent = `<!DOCTYPE html>
                                    <html lang="en">
                                    <head>
                                    <meta charset="UTF-8">
                                    <meta name="viewport" content="width=device-width, initial-scale=1.0">
                                    <title>Job Opportunities at [Company Name]</title>
                                    <style>
                                        /* Basic styles for a cleaner and more modern look */
                                        body {
                                        font-family: sans-serif;
                                        margin: 0;
                                        padding: 20px;
                                        background-color: #f5f5f5; /* Light gray background */
                                        }
                                        h1 {
                                        font-size: 2em; /* Increase heading size */
                                        margin-bottom: 10px;
                                        text-align: center; /* Center text */
                                        }
                                        img {
                                        display: block;
                                        margin: 0 auto; /* Center image horizontally */
                                        width: 250px; /* Adjust image width as needed */
                                        border-radius: 5px; /* Add rounded corners */
                                        }
                                        p {
                                        font-size: 16px; /* Adjust paragraph size */
                                        line-height: 1.5; /* Increase line spacing for readability */
                                        text-align: center; /* Center paragraph text */
                                        }
                                        a {
                                        color: #007bff; /* Blue color for links */
                                        text-decoration: none; /* Remove underline from links */
                                        }
                                        a:hover {
                                        text-decoration: underline; /* Underline links on hover */
                                        }
                                    </style>
                                    </head>
                                    <body>
                                    <h1>New Job Posted For : ${data.company}</h1>
                                    <img src="${data.imageUrl}">
                                    <p>Exciting opportunities await talented individuals at ${data.company}. This Job is posted in <a href="http://localhost:4000/">Campus Recruit</a> App. 
                                    <a href="${data.companyWebsite}">Explore Careers at ${data.company}</a></p>
                                    </body>
                                    </html>`;

        //sending mail to students
        const students = await studentModel.find({}, 'email');
        const emails = students.map(student => student.email);
        const msg = {
            from: "tdemo651@gmail.com",
            to: emails,
            subject: "New Job Posted - Campus Recruit",
            html: htmlContent
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
        res.redirect('/adminJobPosting');
    } catch (error) {
        console.log(error);
    }
}
export const getJobResponses = async (req, res) => {
    try {
        console.log();
        const jobId = req.query.id;
        const job = await jobPostingModel.findOne({jobId : jobId });
        const data = await appliedJobsModel.find({jobId : job._id}).
        populate('studentId').populate('jobId').exec();
        res.render('adminJobResponses',{
            data 
        });
    } catch (error) {
        console.log(error);
    }
}
export const postAdminLogin = (req, res) => {
    const username = req.body.username;
    const password = req.body.password;
    if (username == 'admin@gbpiet.com' && password == 'admin') {
        req.session.isLoggedIn = true;
        req.session.isAdmin = true;
        req.session.save((err) => {
            res.redirect('/adminDashboard');
        });
    } else {
        res.redirect('/error');
    }
}
export const downloadResponses = async (req, res) => {
    const jobId = req.query.id;
    const job = await jobPostingModel.findOne({
        jobId: jobId
    });
    const documents = await appliedJobsModel.find({
        jobId: job._id
    });

    if (documents.length === 0) {
        res.redirect('/error');
    }

    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Sheet 1');

    worksheet.columns = [{
            header: 'S.No.',
            key: 'no',
            width: 20
        },
        {
            header: 'Student Id',
            key: 'id',
            width: 20
        },
        {
            header: 'Name',
            key: 'name',
            width: 20
        },
        {
            header: 'Email',
            key: 'email',
            width: 20
        },
        {
            header: 'Phone',
            key: 'phone',
            width: 20
        }
    ];

    let num = 1;
    for (const doc of documents) {
        const student = await studentModel.findOne({
            _id: doc.studentId
        });
        worksheet.addRow({
            no: num,
            id: student.studentId,
            name: doc.name,
            email: doc.email,
            phone: doc.phone
        });
        num++;
    }

    res.setHeader(
        'Content-Type',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    );
    res.setHeader('Content-Disposition', 'attachment; filename=documents.xlsx');

    await workbook.xlsx.write(res);
    res.end();
}
export const deleteJob = async (req, res) => {
    const jobId = req.body.id;
    await jobPostingModel.deleteOne({
        jobId: jobId
    });
    res.redirect('/adminJobPosting');
}

export const logOut = async (req, res) => {
    req.session.isLoggedIn = false;
    req.session.destroy();
    res.redirect('/');
}