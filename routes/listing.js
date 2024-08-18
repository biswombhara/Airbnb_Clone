const express = require("express");
const router = express.Router();
const wrapAsync = require('../util/wrapAsync.js');
const {isLoggedIn, isOwner, validateListing} =require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer  = require('multer');
const {storage}  = require('../cloudConfig.js');
const upload = multer({ storage });

router
  .route("/")
  .get(wrapAsync(listingController.index))
  .post(
    isLoggedIn,
    upload.single('listing[image]'),
    validateListing, 
    wrapAsync(listingController.createNewListing)
  );

  //NEW List PATH
  router.get("/new", 
  isLoggedIn, 
  listingController.newListing);

router
    .route("/:id")
    .get(wrapAsync(listingController.viewListing ))
    .put(
      isOwner, 
      isLoggedIn,
      upload.single('listing[image]'),
      validateListing, 
      wrapAsync(listingController.updateListing)
    )
    .delete( 
      isOwner, 
      isLoggedIn, 
      wrapAsync(listingController.deleteListing)
    );

  //EDIT PATH
  router.get("/:id/edit", 
  isOwner, 
  isLoggedIn, 
  wrapAsync(listingController.editListing));

module.exports = router;