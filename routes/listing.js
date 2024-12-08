const express = require("express");
const router = express.Router();
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const multer = require("multer");
const { storage } = require("../cloudConfig.js");
const upload = multer( { storage } );
const {
    index,
    renderNewForm,
    showListing,
    createListing,
    renderEditForm,
    updateListing,
    destroyListing,
} = require("../controllers/listings");

router.route("/")
.get(index)
.post(
    isLoggedIn,
    upload.single("listing[image]"),
    validateListing,
    createListing,
)


router.get("/new", isLoggedIn, renderNewForm);


router.route("/:id")
    .get(showListing)
    .put(
        isLoggedIn,
        isOwner,
        upload.single("listing[image]"),
        validateListing,
        updateListing)
    .delete(
        isLoggedIn,
        isOwner,
        destroyListing);


router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    renderEditForm);

module.exports = router;