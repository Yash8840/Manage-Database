exports.event_list = (req, res, next) => { 
    res.send("Event List")
}; 

exports.event_detail = (req, res) => { 
    res.send(`Event detail: ${req.params.id}`); 
}; 

exports.create_event_get = (req, res) => { 
    res.send("create event get"); 
}; 

exports.create_event_post = (req, res) => { 
    res.send("create event post"); 
}; 

exports.delete_event = (req, res) => { 
    res.send("delete event"); 
}; 

exports.update_event_get = (req, res) => { 
    res.send("update event get"); 
}; 

exports.update_event_put = (req, res) => {  
    res.send("update event put")
}