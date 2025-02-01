const express=require('express');
require('dotenv').config()
const app = express();
const cors =require('cors');
const mysql= require("mysql")
app.use(cors())
app.use(express.json())
const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database: ""
})
app.listen(process.env.PORT,()=>
{
    console.log('listening port  '+process.env.PORT)


})