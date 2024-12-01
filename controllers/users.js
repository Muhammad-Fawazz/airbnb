const Listing = require("../models/listing.js");
const wrapAsync = require("../utils/wrapAsync");
const User = require("../models/user");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
}

module.exports.signupForm = async (req, res) => {
    res.render("users/signup.ejs");
}

module.exports.signup = wrapAsync(async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const newUser = new User({ username, email });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser, (err) => {
            if (err) {
                return next(err);
            }
            req.flash("success", "Welcome to Wanderlust!");
            res.redirect("/listings");
        });

    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup");
    }
})

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome to WanderLust! You are logged in.");
    const redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);
}

module.exports.logout = (req, res, next) => {
    req.logOut((err) => {
        if (err) {
            return next(err);
        }
        req.flash("success", "Logged out successfully!");
        res.redirect("/listings");
    });
}

module.exports.loginForm = async (req, res) => {
    res.render("users/login.ejs");
}