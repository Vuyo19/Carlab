const express = require('express')
const app = express() 
const urlprefix = '/api' 
 
// Connecting to the MongoDB. 
const mongoose = require('mongoose')
const fs = require('fs');
const cert = fs.readFileSync('keys/certificate.pem'); 
const options = {
    server: {sslCA: cert}
}; 
const connstring = 'mongodb+srv://Vuyo19:JBOWuiZqlNEOqTpV@ironcladapds.cflv5lu.mongodb.net/?retryWrites=true&w=majority' 

// For routing. 
const carRoutes = require("./routes/car");  
const userRoutes = require("./routes/user")

mongoose.connect(connstring)
.then(() =>
{
    console.log("Connected :-)")   
})
.catch(() =>
{
    console.log("NOT Connected :-(")   

}, options) 

app.use(express.json())  

app.use(urlprefix+'/cars',carRoutes)
app.use(urlprefix+'/users',userRoutes)  

// SettingHeaders
// Allow frontend to call backend without any cross origin restriction issues.
app.use((reg,res,next) => 
{
    res.setHeader('Access-Control-Allow-Origin', '*'); 
    res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With-Content-Type,Accept,Authorization'); 
    res.setHeader('Access-Control-Allow-Methods','*');
    next();
});  

module.exports = app; 


