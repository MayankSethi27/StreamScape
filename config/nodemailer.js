const nodemailer=require("nodemailer");
const path=require("path");
const ejs=require('ejs');



//this is part which sends mail
let transporter=nodemailer.createTransport({
    service:'gmail',
    host:"smtp.gmail.com",
    port:587,
    secure:'false',
    auth:{
        user:'mayanksethi324@gmail.com',
        pass:'pfbfdwmgctiosief'
    }
});

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