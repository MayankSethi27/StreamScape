const queue=require('../config/kue');
const commentsMailer=require('../controller/mailers/comments_mailers');

//this function is a worker, which when there is new task is created inside this queue('email') it will run this code to send mail inside this queue
//name of queue is 'email'
//'job argument will get the comment
queue.process('emails',function(job,done){
     console.log("emails worker is processing a job",job.data);

     //calling mailer function to send mails
     //job.data is the comment written
     commentsMailer.newComment(job.data);
     done();
})