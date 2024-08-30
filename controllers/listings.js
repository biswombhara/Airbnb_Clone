const Listing = require("../models/list.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });

module.exports.index= (async (req,res)=>{
    let search  = req.query.data;
    let type = req.query.q;
    let allListings = await Listing.find().populate("reviews");
    if(search){
        type=search;   
    }
    let filterListing = await Listing.find({filter:type});
    let R = req.route.path
    res.render("listings/index.ejs",{allListings,type,R});
  });

module.exports.newListing = (req, res) => {
  let R = req.route.path
    res.render("listings/new.ejs",{R});
  }

  module.exports.viewListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id).populate({
      path:"reviews",
      populate:{
        path:"author"
      }
    })
    .populate("owner");
    if(!listing){
      req.flash("error","Sorry! your requested listing doesnot exist...");
      res.redirect("/listings");
    }
    
    let response = await geocodingClient.forwardGeocode({
      query: listing.location,
      limit: 1
    })
    .send();
    listing.geometry = response.body.features[0].geometry;
    res.render(`listings/show.ejs`,{ listing, req });
  }

  module.exports.createNewListing = async (req, res, next) => {  
    let response = await geocodingClient.forwardGeocode({
      query: req.body.listing.location,
      limit: 1
    })
    .send();
    let url = req.file.path;
    let filename = req.file.filename; 
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;
    newListing.image = {url, filename};
    newListing.geometry = response.body.features[0].geometry;
    await newListing.save();
    req.flash("success","New List created...");
    res.redirect("/listings",{req});
  }

  module.exports.editListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findById(id);
    if(!listing){
      req.flash("error","Sorry! your requested listing doesnot exist...");
      res.redirect("/listings");
    }
    let orgImage = listing.image.url;
    orgImage = orgImage.replace("/upload", "/upload/h_250")
    res.render("listings/edit.ejs",{listing, orgImage, req});
  }

  module.exports.updateListing = async (req, res) => {
    let {id} = req.params;
    let listing = await Listing.findByIdAndUpdate(id,{...req.body.listing});
    console.log(listing.image)
    if(typeof req.file !== "undefined"){
      let url = req.file.path;
      let filename = req.file.filename; 
      listing.image = {url, filename};
      await listing.save();
    }  
    req.flash("success","List updated...");
    res.redirect(`/listings/${id}`,{req});
  }

  module.exports.deleteListing = async (req, res) => {
    let {id} = req.params;
    await Listing.findByIdAndDelete(id);
    req.flash("success","List deleted...");
    res.redirect("/listings",{req});
  }