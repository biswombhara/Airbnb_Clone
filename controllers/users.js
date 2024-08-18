const User = require("../models/user.js");

module.exports.userSignupForm = (req,res) => {
    res.render("users/signup.ejs");
}

module.exports.userSignup = async(req,res) => {
    try{
        let {email, username, password} = req.body;
        let newUser = new User({email, username});
        let registerdUser = await User.register(newUser,password);
        console.log(req.session)
        req.login(registerdUser, (err) => {
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust!");
            res.redirect(res.locals.redirectUrl);
        })
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
}

module.exports.userLoginForm = (req,res) => {
    res.render("users/login.ejs");
}

module.exports.userLogin = async(req,res) => {
    req.flash("success","Welcome back to Wanderlust!");
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.userLogout = (req,res,next) => {
    req.logout((err) => {
        if(err){
            next(err);
        }
        req.flash("success","You are logged-out!");
        res.redirect("/listings");
    })
}