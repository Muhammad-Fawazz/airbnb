const express = require("express");
const router = express.Router();
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const {
    renderNewForm,
    showListing,
    createListing,
    renderEditForm,
    updateListing,
    destroyListing,
} = require("../controllers/listings");

router.get("/", async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
});

// New Route
router.get("/new", isLoggedIn, renderNewForm);

// Show Route
router.get("/:id", showListing);

// Create Route
router.post("/",
    isLoggedIn,
    validateListing,
    createListing);

// Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    renderEditForm);

// Update Route
router.put("/:id",
    isLoggedIn,
    validateListing,
    isOwner,
    updateListing);

// Delete Route
router.delete("/:id",
    isLoggedIn,
    isOwner,
    destroyListing);



module.exports = router;