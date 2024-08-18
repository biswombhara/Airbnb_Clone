const Listing = require("./models/list.js");
const Review = require("./models/review.js");
const ExpressError = require('./util/ExpressError.js');
const {listingSchema} = require("./schema.js");
const {reviewSchema} = require("./schema.js");

module.exports.isLoggedIn = (req,res,next)=>{
    if(!req.isAuthenticated()){
        req.session.redirectUrl = req.originalUrl;
        req.flash("error","You must login for it");
        return res.redirect("/login");
    }
    next();
}

module.exports.saveRedirectUrl = (req,res,next) => {
    if(req.session.redirectUrl){
        res.locals.redirectUrl = req.session.redirectUrl;
    }
    next();
}

module.exports.isOwner = async(req,res,next) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing && listing.owner.equals(res.locals.currUser._id)){
        res.flash("error","This listing is not belongs to you...");
        res.redirect(`listings/${id}`);
    }
    next();
}

module.exports.validateListing=(req,res,next) => {
  if (!req.body.listing) {
    throw new ExpressErrors(400, "Listing data is missing.");
  }
    let {error }= listingSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(404,errMsg);
    }else{
      next();
    }
  }

  module.exports.validateReview = (req,res,next) => {
    let {error }= reviewSchema.validate(req.body);
    if(error){
      let errMsg = error.details.map((el) => el.message).join(",");
      throw new ExpressError(404,errMsg);
    }else{
      next();
    }
  }

  module.exports.isReviewAuthor = async(req, res, next) =>{
    let {id, reviewId} = req.params;
    let review = await Review.findById(reviewId);
    if(!review.author.equals(res.locals.currUser._id)){
      req.flash("error","You can't delete other's review...");
      return res.redirect(`/listings/${id}`);
    }
    next();
  }