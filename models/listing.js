const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const Review = require("./review.js");
const { type } = require("express/lib/response.js");

const listingSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    image: {
        filename: String,
        url: String
        // default: "https://unsplash.com/photos/a-palm-tree-leaning-over-on-the-beach-PiI5kUwt9NI",
        // set: (v) => v === ""
        // ? "https://unsplash.com/photos/a-palm-tree-leaning-over-on-the-beach-PiI5kUwt9NI" 
        // : v
    },
    price: Number,
    location: String, 
    country: String,
    reviews: [
        {
            type: Schema.Types.ObjectId,
            ref: "Review"
        }
    ],
    owner: {
        type: Schema.Types.ObjectId,
        ref: "User"
    }
});

listingSchema.post("findOneAndDelete", async (listing) => {
    if(listing) {
        await Review.deleteMany({_id: {$in: listing.reviews}});
    }
});

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
