const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../util/wrapAsync.js");
const passport =require("passport");
const {saveRedirectUrl} =require("../middleware.js");
const userController = require("../controllers/users.js")

router
    .route("/signup")
    .get(userController.userSignupForm)
    .post(wrapAsync (userController.userSignup));

router
    .route("/login")
    .get(userController.userLoginForm)
    .post( 
        saveRedirectUrl, 
        passport.authenticate('local', 
        { failureRedirect: '/login', failureFlash:true }), 
        wrapAsync (userController.userLogin)
    );

router.get("/logout", userController.userLogout);

module.exports = router;