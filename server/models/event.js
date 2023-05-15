const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 
const { DateTime } = require("luxon"); 

const EventSchema = new Schema({ 
    title: { type: String, minLength: 1, required: true }, 
    description: { type: String, minLength: 1, required: true }, 
    startDate: { type: Date }, 
    stopDate: { type: Date }, 
    photo: { 
        data: [ Buffer ], 
        contentType: String,  
    }, 
    places:  [ { type: Schema.Types.ObjectId, ref: "Place" } ] 
}); 

EventSchema.virtual("startDate_formatted").get(function () { 
    return DateTime.fromJSDate(this.sendDate).toLocaleString(DateTime.DATETIME_MED); 
}); 

module.exports = mongoose.model("Event", EventSchema); 