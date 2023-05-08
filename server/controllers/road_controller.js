exports.roads_list = (req, res, next) => { 
    res.send("roads list GET"); 
}; 

exports.road_detail = (req, res, next) => { 
    res.send(`road detail GET: ${req.params.id}`); 
}; 

exports.road_create_get = (req, res, next) => { 
    res.send("road create get"); 
}; 

exports.road_create_post = (req, res, next) => { 
    res.send("road create post"); 
}; 

exports.road_delete = (req, res, next) => { 
    res.send("road DELETE"); 
}; 

exports.road_update_get = (req, res, next) => { 
    res.send("road update")
}; 

exports.road_update_put = (req, res, next) => { 
    res.send("road update PUT")
}