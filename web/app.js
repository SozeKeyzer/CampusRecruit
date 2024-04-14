import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import connect from './config/db.js';
import { fileURLToPath } from 'url';
import dotenv from "dotenv";
dotenv.config();

const app = express();

import studentRoute from './routes/studentRoute.js'
import adminRoute from './routes/adminRoute.js'

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname,'public')));

app.set("view engine","ejs");
app.set("views","./views");

app.use(studentRoute);
app.use(adminRoute);

app.use('/',(req,res)=>{
    res.render('home.ejs');
});

connect().then(()=>{
    app.listen(process.env.PORT,()=>{
    console.log(`running on port ${process.env.PORT}`);
});
});


