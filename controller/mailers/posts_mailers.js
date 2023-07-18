const nodeMailer=require('../../config/nodemailer');

// newPost=function(post){}
// module.exports=newpost

//another way of exporting function
//this function is to send mail
exports.newPost=(post)=>{
    console.log("inside newPost mailer");
    let htmlString=nodeMailer.renderTemplate({post:post},'/posts/new_posts.ejs');

    nodeMailer.transporter.sendMail({
        from:"mayanksethi1001@gmail.com",
        to:post.user.email,
        subject:"New post Published!",
        // html:"<h1>Yup, Your posts now Published!</h1>"
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
