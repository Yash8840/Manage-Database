const { body, validationResult } = require("express-validator"); 

const Place = require("../models/place");
const PLACE_TYPES = require("../global/place_types"); 

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

exports.place_create_get= (req, res, next) => { 
    res.status(200).json({ pageTitle: "Create Place"}); 
}; 

exports.place_create_post = [ 
    body("title", "Title is required") 
        .trim() 
        .isLength({min: 1})
        .escape (), 
    body("description", "Description is required")
        .trim() 
        .isLength({ min: 1 }) 
        .escape(), 
    body("type", "Type is required")
        .trim() 
        .isLength({ min: 1 })
        .escape(), 
    body("photo") 
        .trim() 
        .optional({ checkFalsy: true })
        .escape(), 
    body("history")
        .trim() 
        .optional({ checkFalsy: true }) 
        .escape(), 
    body("contact") 
        .trim() 
        .optional({ checkFalsy: true })
        .escape(), 
    body("city")
        .trim() 
        .escape(), 
    body("adress")
        .trim()
        .optional({ checkFalsy: true })
        .isString()
        .escape(), 

    async (req, res, next) => { 
        const errors = validationResult(req); 
        const place = new Place({ 
            title: req.body.title, 
            description: req.body.description, 
            type: req.body.type, 
            photo: req.body.photo, 
            history: req.body.history, 
            contact: req.body.contact, 
            city: req.body.city, 
            adress: req.body.adress, 
        });         

        if(!errors.isEmpty()) { 
            res.status(403).send(
                {
                    title: place.title, 
                    description: place.description, 
                    type: place.type, 
                    photo: place.photo, 
                    history: place.history, 
                    contact: place.contact, 
                    city: place.city, 
                    adress: place.adress, 
                    errors: errors.array()
                }
            ); 
        }
        
        console.log("DONE"); 
        await place.save(); 
        res.status(200).send(place); 
    }
]

exports.place_delete_post = async (req, res, next) => { 
    const place = await Place.findById(req.params.id); 

    if(place) { 
        await Place.findByIdAndDelete(req.params.id); 
        res.status(200).json({ message: "Place deleted", place}); 
    } else { 
        res.status(403).json({ message: "Place not found"}); 
    }
}; 

exports.place_update_get = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: place update GET" );  
}; 

exports.place_update_post = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: place update POST"); 
};



