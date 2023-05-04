exports.users_list = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: user list"); 
}; 

exports.user_detail = (req, res, next) => { 
    res.send(`NOT IMPLEMENTED: user detail ${req.params.id}`); 
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