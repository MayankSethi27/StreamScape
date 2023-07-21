const development={
    name:'development',
    session_cookie_key:'blahsomething',
    db:'mongodb+srv://mayank:mayank27@cluster0.yx0w0d3.mongodb.net/?retryWrites=true&w=majority',
    smtp:{
        service:'gmail',
        host:"smtp.gmail.com",
        port:587,
        secure:'false',
        auth:{
            user:'mayanksethi324@gmail.com',
            pass:'pfbfdwmgctiosief'
        }
    },
    google_client_id:"321224408392-h8t13s8ngu39pe1b5qp30pnotrqeg6d9.apps.googleusercontent.com",
    google_client_secret:"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",
    google_callback_url:"http://localhost:5959/user/auth/google/callback",
    jwt_secret:'StreamScape'
}

const production={
    name:"production",
    session_cookie_key:process.env.CODEIAL_SESSION_COOKIE_KEY,
    db:process.env.CODEIAL_DB,
    smtp:{
        service:'gmail',
        host:"smtp.gmail.com",
        port:587,
        secure:'false',
        auth:{
            user:process.env.CODEIAL_GMAIL_USERNAME,
            pass:process.env.CODEIAL_GMAIL_PASSWORD
        }
    },
    google_client_id:process.env.CODEIAL_GOOGLE_CLIENT_ID,
    google_client_secret:process.env.CODEIAL_GOOGLE_CLIENT_SECRET,
    google_callback_url:process.env.CODEIAL_GOOGLE_CALLBACK_URL,
    jwt_secret:process.env.CODEIAL_JWT_SECRET
}

module.exports=eval(process.env.CODEIAL_ENVIRONMENT==undefined ? development : eval(process.env.CODEIAL_ENVIRONMENT));