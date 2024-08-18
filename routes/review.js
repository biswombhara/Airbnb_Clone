const express = require("express");
const router = express.Router({mergeParams : true});
const wrapAsync = require('../util/wrapAsync.js');
const {validateReview, isLoggedIn, isReviewAuthor} =require("../middleware.js");
const reviewController = require("../controllers/reviews.js")


//Review create path
router.post("/", 
isLoggedIn, 
validateReview, 
wrapAsync(reviewController.createReview));
  
  // DELETE Review
  router.delete("/:reviewId", 
  isLoggedIn, 
  isReviewAuthor,
  wrapAsync(reviewController.destroyReview))
  
  module.exports = router;
  