const express = require('express');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');

const app = express();


app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));
app.use(session({secret: 'my secret',resave: false, saveUninitialized: false}));

app.set("view engine","ejs");
app.set("views","./views");

app.use('/',(req,res,next)=>{
    res.render('home.ejs',{
        data:req.session.isLoggedIn
    });
});

app.listen(2000,()=>{
    console.log('running on port 2000');
});


