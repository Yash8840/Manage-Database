const mongoose = require("mongoose"); 
const Schema = mongoose.Schema; 

const UserSchema = new Schema({ 
    username: { type: String, minLength: 1, maxLength: 30, required: true }, 
    email: { type: String, minLength: 1, required: true }, 
    password: { type: String, minLength: 1, maxLength: 20, required: true }, 
}); 

UserSchema.virtual("url").get(function () { 
    return `/profiles/${this._id}`;
}); 

module.exports = mongoose.model("User", UserSchema);
