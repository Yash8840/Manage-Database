const mongoose = require("mongoose"); 
const Schema = monogoose.Schema; 

const RoadSchema = new Schema({ 
    title: { type: String, minLength: 1, required: true}, 
    description: { type: String, minLength: 1, required: true }, 
    places: [ { type: Schema.Types.ObjectId, ref: "Place" }], 

    photo: { 
        data: [ Buffer ], 
        contentType: String, 
    }
}); 

RoadSchema.virtual("url").get(function () { 
    return `/general/trasee/${this._id}`; 
}); 

module.exports = mongoose.model("Road", RoadSchema);