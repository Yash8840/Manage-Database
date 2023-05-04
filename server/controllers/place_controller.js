const Place = require("../models/place");

exports.place_list = async (req, res, next) => { 
    const places = await Place.find({}, "title").exec(); 
    if(places == null) { 
        res.status(403); 
    } else { 
        res.status(200).json({ places }); 
    }
}; 

exports.place_detail = async (req, res, next) => { 
    try { 
        const place = await Place.findById(req.params.id).exec();
        res.status(200).json({ place: place }); 
    } catch (e){ 
        res.status(403); 
    }
}; 

exports.place_create_get = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: place create GET"); 
}; 

exports.place_create_post = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: place create POST"); 
}; 

exports.place_delete_post = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: place detelet POST");
}; 

exports.place_update_get = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: place update GET" );  
}; 

exports.place_update_post = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: place update POST"); 
};



