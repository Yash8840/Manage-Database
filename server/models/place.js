const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const PlaceSchema = new Schema({ 
    title: { type: String, minLLength: 1, maxLength: 200, required: true }, 
    description: { type: String, minLength: 1, maxLength: 30000, required: true },
    type: { type: String, minLength: 1, maxLength: 100, require: true },
    photo: { type: String, minLength: 1, maxLength: 100 },
    history: { type: String, minLength: 1, maxLength: 30000 }, 
    contact: { type: String, minLength: 1, maxLength: 100 },
    city: { type: String, minLength: 1 }, 
    adress: { type: String, minLength: 1 }, 
}); 

PlaceSchema.virtual("url").get(function () { 
    return `/general/${this._id}`;
})

module.exports = mongoose.model("Place", PlaceSchema);