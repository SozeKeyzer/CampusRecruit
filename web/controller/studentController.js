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
    getStudentJobPosting:async (req,res)=>{
      try{
        const response=await axios.get('http://localhost:9090/jobPosting');
        const data=response.data;
        res.render('studentJobPosting',{data});
      }
      catch(error){
        console.log(error);
      }
        
    },
    getStudentProfile:async (req,res)=>{
        // const response = await axios.get(`http://localhost:9090/student/200244`);
        //   const data = response.data;
        res.render('studentProfile',{
            // data:data
        });
    },
    postStudentLogin: async (req, res) => {
        const id = req.body.username;
        const password = req.body.password;
        console.log(id);
      
        try {
          const response = await axios.get(`http://localhost:9090/student/${id}`);
          const data = response.data;
          if(password==data.password){
            res.redirect('/studentDashboard');
          }
        } catch (error) {
          console.error(error);
        }
      },
    postStudentRegister:(req,res)=>{
          axios.post('http://localhost:9090/student', req.body)
            .then(response => {
              console.log('Student added successfully');
            })
            .catch(error => {
              console.error('Error adding student:', error);
            });
        res.redirect('/studentRegister');
    }
};