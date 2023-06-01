const nodeMailer=require('../../config/nodemailer');

// newComment=function(comment){}
// module.exports=newComment

//another way of exporting function
//this function is to send mail
exports.newComment=(comment)=>{
    console.log("inside newComment mailer");
    let htmlString=nodeMailer.renderTemplate({comment:comment},'/comments/new_comments.ejs');

    nodeMailer.transporter.sendMail({
        from:"mayanksethi324@gmail.com",
        to:comment.user.email,
        subject:"New comment Published!",
        // html:"<h1>Yup, Your commentis now Published!</h1>"
        html:htmlString
    },(err,info)=>{
        if(err){
        console.log("Error in sending Mail",err);
        return;
        }
        else{
            console.log('Message sent',info);
            return;
        }
    });
}
