const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 
const { DateTime } = require("luxon"); 

const EventSchema = new Schema({ 
    title: { type: String, minLength: 1, required: true }, 
    description: { type: String, minLength: 1, required: true }, 
    startDate: { type: Date, default: Date.now }, 
    photo: { 
        data: [ Buffer ], 
        contentType: "image/json", 
    }, 
    places: { type: Schema.Types.ObjectId }
}); 

EventSchema.get("startDate_formatted").get(function () { 
    return DateTime.fromJSDate(this.sendDate).toLocaleString(DateTime.DATETIME_MED); 
}); 

module.exports = mongoose.model("Event", EventSchema); 