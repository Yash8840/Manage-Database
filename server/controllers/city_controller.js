const { body, validationResult } = require('express-validator'); 
const fs = require("fs"); 
const async = require("async"); 

const City = require("../models/city"); 
const Place = require("../models/place"); 
const upload = require("../middleware/upload_multer"); 

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

/*

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
*/

exports.city_create_post = async (req, res, next) => { 
    upload(req, res, async(err) => { 
        if(err) { 
            console.log(err); 
            console.log(req.body); 
            console.log(req.files); 
        }
        else { 
            const dataFiles = []; 
            if(req.files) { 
                const files = req.files;
                files.forEach(file => { 
                    dataFiles.push(fs.readFileSync(`../uploads/${files[files.indexOf(file)].filename}`)); 
                }); 

            }

            const city = new City( 
                {
                    title: req.body.title, 
                    description: req.body.description, 
                    photo: { 
                        data: dataFiles,
                        contentType: "image/jpg", 
                    }, 
                    surface: req.body.surface, 
                    population: req.body.population
                }
            ); 

            if(req.body.components) { 
                city.components = req.body.components; 
            }

            if(req.body.history) { 
                city.history = req.body.history; 
            }; 
    
            await city.save(); 
            res.status(200).json({ message: "city added", city}); 
        }
    })
}


exports.city_delete_post = async (req, res, next) => { 
    const city = await City.findById(req.params.id); 

    if(city == null) { 
        res.status(403); 
    } else { 
        async.parallel(
            {
                async city() { 
                    const c = await City.findByIdAndDelete(req.params.id); 
                    return c; 
                }, 

                async places () { 
                    const p = await Place.deleteMany({ city: city.title }); 
                    return p; 
                }
            }, (err, results) => { 
                if(err) { 
                    console.log(err); 
                } else { 
                    console.log(results.places); 
                    console.log(results.city); 
                    res.status(200).json({ 
                        message: "city deleted", 
                        city: results.city, 
                    })
                }
            }
        )
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
