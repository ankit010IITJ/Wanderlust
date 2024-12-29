const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn, isOwner, validateListing} = require("../middleware.js")
const listingController = require("../controllers/listings.js");
const multer  = require('multer')
const {storage} = require("../cloudConfig.js");
const upload = multer({ storage });

//Index Route
router.get("/", wrapAsync(listingController.index));

//New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

//Show Route
router.get("/:id", wrapAsync(listingController.showListing));


//Create Route
// app.post("/listings", async (req, res) => {
//     // let {title, description, image, price, country, location} = req.body;
//     // let listing = req.body;
//     // console.log(listing);
//     try {
//         const newListing = new Listing(req.body.listing);
//         await newListing.save();
//         res.redirect("/listings");
//     }
//     catch(err){
//         next(err);
//     }
// });

//Create Route-2
router.post(
    "/",
    isLoggedIn, 
    //validateListing,
    upload.single('listing[image]'),
    wrapAsync(listingController.createListing)
);

//Edit Route
router.get("/:id/edit",
    isLoggedIn,
    isOwner,
    wrapAsync(listingController.renderEditForm)
);

//Update Route
router.put("/:id", 
    isLoggedIn,
    isOwner,
    // validateListing,
    upload.single('listing[image]'),
    wrapAsync(listingController.updateListing)
);

//Delete Route
router.delete("/:id",
    isOwner,
    isLoggedIn,
    wrapAsync(listingController.destroyListing)
);

module.exports = router;