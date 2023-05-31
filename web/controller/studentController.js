const axios = require('axios');

module.exports={
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
    getStudentLogin:(req,res)=>{
        res.render('studentLogin');
    },
    getStudentRegister:(req,res)=>{
        res.render('studentRegister');
    },
    getStudentDashboard:(req,res)=>{
        res.render('studentDashboard');
    },
    getStudentJobPosting:(req,res)=>{
        res.render('studentJobPosting');
    },
    getStudentProfile:(req,res)=>{
        res.render('studentProfile');
    }
};