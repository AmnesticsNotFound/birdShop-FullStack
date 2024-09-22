const mongoose = require("mongoose");

const ParrotSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    name:String,
    description:String,
    quantity:String,
    images:Array,
    price:Number,
    key:Number,

    
});


module.exports = mongoose.model("Parrots", ParrotSchema);
