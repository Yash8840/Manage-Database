const User = require("../models/user");

exports.users_list = async (req, res, next) => { 
    try { 
        const users = await User.find({}).exec(); 
        res.status(200).json({ users: users }); 
    } catch(e) { 
        res.status(403).json({ error: e});
    }
}; 

exports.user_detail = async (req, res, next) => { 
    const user = req.user; 
    if(user) { 
        res.status(200).json({ user: user}); 
    } else { 
        res.status(403).json({ error: "No user logged in"}); 
    }
}; 

exports.user_delete = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: delete user DELETE"); 
}; 

exports.user_update_get = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: user update GET")
}; 

exports.user_update_put = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: user updatet PUT");  
};