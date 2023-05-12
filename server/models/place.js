const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const PlaceSchema = new Schema({ 
    title: { type: String, minLLength: 1, maxLength: 200, required: true }, 
    description: { type: String, minLength: 1, maxLength: 30000, required: true },
    type: { type: String, minLength: 1, maxLength: 100, require: true },
    photo: { 
        data: [ Buffer ], 
        contentType: String
    }, 
    history: { type: String, minLength: 1, maxLength: 30000 }, 
    contact: { type: String, minLength: 1, maxLength: 100 },
    city: { type: String, minLength: 1 }, 
    adress: { type: String, minLength: 1 },
    restaurant: { 
        program: { type: String, minLength: 1, required: true }, 
        menu: { 
            data: [ Buffer ], 
            contentType: String, 
        }
    }
}); 

PlaceSchema.virtual("url").get(function () { 
    return `/general/${this._id}`;
})

module.exports = mongoose.model("Place", PlaceSchema);