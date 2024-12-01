const express = require("express");
const router = express.Router({ mergeParams: true });
const { validateReview, isLoggedIn, isReviewAuthor } = require("../middleware.js");
const reviewController = require("../controllers/reviews.js");

router.post(
    "/",
    validateReview,
    isLoggedIn,
    reviewController.createReview
);

router.delete("/:reviewID",
    isLoggedIn,
    isReviewAuthor,
    reviewController.destroyReview);

module.exports = router;