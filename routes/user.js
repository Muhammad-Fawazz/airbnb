const express = require("express");
const router = express.Router({ mergeParams: true });
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controllers/users.js");


// Index Route
router.get("/", userController.index);


router.get("/signup", userController.signupForm);

router.post("/signup", userController.signup);

router.get("/login", userController.loginForm);

router.post("/login",
    saveRedirectUrl,
    passport.authenticate("local", {
        failureRedirect: "/login",
        failureFlash: true,
    }), userController.login);

router.get("/logout", userController.logout );

module.exports = router;
