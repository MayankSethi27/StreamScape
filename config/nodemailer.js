const nodemailer=require("nodemailer");
const path=require("path");
const ejs=require('ejs');
const env=require('./environment');


//this is part which sends mail
let transporter=nodemailer.createTransport(env.smtp);

let renderTemplate=(data,relativePath) => {
    let mailHTML;
    ejs.renderFile(
        path.join(__dirname,'../views/mailers',relativePath),
        data,
        function(err,template){
            if(err){
                console.log("Error in rendering Template",err);
                return;
            }
            else{
                console.log("mailHTML=template");
                mailHTML=template;
            }
        }
    )
        return mailHTML;
    
}

module.exports={
    transporter:transporter,
    renderTemplate:renderTemplate
}