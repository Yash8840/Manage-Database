const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const CitySchema = new Schema({ 
    title: { type: String, minLength: 1, required: true }, 
    components: { type: "String", minLength: 1 } ,
    description: { type: String, minLength: 1,  required: true }, 
    photo: { type: String, minLength: 1, maxLength: 10 },
    surface: { type: Number, required: true }, 
    history: { type: String, minLength: 1 }, 
    population: { type: Number, required: true }, 
});

CitySchema.virtual("url").get(function () { 
    return `/general/city/${this._id}`;
})

module.exports = mongoose.model("City", CitySchema);