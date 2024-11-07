const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name:String,
    description:String,
    rating:Number,

    
});


module.exports = mongoose.model("Reviews", ReviewSchema);