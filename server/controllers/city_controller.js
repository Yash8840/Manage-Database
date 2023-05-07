const { body, validationResult } = require('express-validator'); 

const City = require("../models/city"); 
const Place = require("../models/place"); 

exports.city_list = async (req, res, next) => { 
    const cities = await City.find({}, "title").exec(); 
    if(cities == null) { 
        res.status(403); 
    } else { 
        res.status(200).json({ cities }); 
    }
}; 


exports.city_detail = async (req, res, next) => { 
        const city = await City.findById(req.params.id).exec(); 
        const placesInCity = await Place.find({ city: city.title }).exec(); 

        if(city == null) { 
            res.status(403); 
        } else { 
            res.status(200).json({ city: city, placesInCity: placesInCity }); 
        }
}; 

exports.city_create_get = (req, res, next) => { 
    res.status(200).json({ pageTitle: "Creeaza Oras" }); 
}; 

exports.city_create_post = [ 
    body("title", "Title is required")
        .trim() 
        .isLength({ min: 1}) 
        .escape(), 
    body("components")
        .trim()
        .optional({ checkFalsy: true })
        .escape(), 
    body("description", "Description is required")
        .trim() 
        .isLength({ min: 1}) 
        .escape(), 
    body("photo")
        .trim()
        .optional({ checkFalsy: true })
        .escape(), 
    body("surface", "Surface is required")
        .trim()
        .isNumeric() 
        .escape(), 
    body("history")
        .trim()
        .optional({ checkFalsy: true })
        .isString() 
        .escape(), 
    body("population", "Population is required")
        .trim()
        .isNumeric() 
        .escape(), 

    async (req, res, next) => { 
        const errors = validationResult(req); 

        const city = new City( 
            {
                title: req.body.title, 
                components: req.body.components, 
                description: req.body.description, 
                photo: req.body.photo, 
                surface: req.body.surface, 
                history: req.body.history, 
                population: req.body.population
            }
        ); 

        if(!errors.isEmpty()) { 
            res.status(403).json({ 
                pageTitle: "Creeaza Oras", 
                title: req.body.title, 
                components: req.body.components, 
                description: req.body.description, 
                photo: req.body.photo, 
                surface: req.body.surface, 
                history: req.body.history, 
                population: req.body.population
            })
        }; 

        await city.save(); 
        res.status(200).json({ message: "city added", city}); 
    }
]


exports.city_delete_post = async (req, res, next) => { 
    const city = await City.findById(req.params.id); 

    if(city == null) { 
        res.status(403); 
    } else { 
        await City.findByIdAndDelete(req.params.id); 
        res.status(200).json({ 
            message: "city deleted", 
            city, 
        })
    }
}; 

exports.city_update_get = async (req, res, next) => { 
    const city = await City.findById(req.params.id); 
    res.status(200).send(city); 
}; 

exports.city_update_post = [ 
    body("title", "Title is required")
        .trim() 
        .isLength({ min: 1}) 
        .escape(), 
    body("components")
        .trim()
        .optional({ checkFalsy: true })
        .escape(), 
    body("description", "Description is required")
        .trim() 
        .isLength({ min: 1}) 
        .escape(), 
    body("photo")
        .trim()
        .optional({ checkFalsy: true })
        .escape(), 
    body("surface", "Surface is required")
        .trim()
        .isNumeric() 
        .escape(), 
    body("history")
        .trim()
        .optional({ checkFalsy: true })
        .isString() 
        .escape(), 
    body("population", "Population is required")
        .trim()
        .isNumeric() 
        .escape(), 
    async (req, res, next) => { 
        const errors = validationResult(req); 

        const city = new City( 
            {
                title: req.body.title, 
                components: req.body.components, 
                description: req.body.description, 
                photo: req.body.photo, 
                surface: req.body.surface, 
                history: req.body.history, 
                population: req.body.population, 
                _id: req.params.id, 
            }
        ); 

        if(!errors.isEmpty()) { 
            res.status(403).json({ 
                pageTitle: "Creeaza Oras", 
                title: req.body.title, 
                components: req.body.components, 
                description: req.body.description, 
                photo: req.body.photo, 
                surface: req.body.surface, 
                history: req.body.history, 
                population: req.body.population, 
                errors: errors.array(),
            }); 
        }; 

        await City.updateOne({ _id: city._id }, city); 
        res.status(200).json({ message: "city added", city}); 
    }
]
