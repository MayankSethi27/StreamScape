//to pass these req to res and to access in templates ejs we use this middleware for flash messages
module.exports.Setflash=function(req,res,next){
    res.locals.flash={
        'success':req.flash('success'),
        'error':req.flash('error')
    }
    next();
}
