const { body, validationResult } = require("express-validator"); 
const upload = require("../middleware/upload_multer"); 
const fs = require("fs"); 

const Place = require("../models/place");
const City = require("../models/city");
const PLACE_TYPES = require("../global/place_types"); 

exports.place_list = async (req, res, next) => { 
    const places = await Place.find({}, { title: 1, type: 1 }).exec(); 
    let placesInOrder = {}; 

    for(let i = 0; i < PLACE_TYPES.length; i++) { 
        placesInOrder[`${PLACE_TYPES[i]}`] = []; 
    }

    for(let i = 0; i < PLACE_TYPES.length; i++) { 
        for(let j = 0; j < places.length; j++) { 
            console.log(places[j].type);
            if(places[j].type == PLACE_TYPES[i]) { 
                placesInOrder[`${PLACE_TYPES[i]}`].push(places[j]); 
            }
        }
    }; 

    res.status(200).send({ place: placesInOrder }); 
}; 

exports.place_types = (req, res, next) => {
    res.send(PLACE_TYPES); 
}

exports.place_detail = async (req, res, next) => { 
    try { 
        const place = await Place.findById(req.params.id).exec();
        if(await City.find({ title: place.city}).exec()) { 
            const city = await City.find({ title: place.city}).exec(); 
            res.status(200).json({ place: place, city: city })
        }
        res.status(200).json({ place: place }); 
        
    } catch (e){ 
        res.status(403); 
    }
}; 

exports.place_create_get= (req, res, next) => { 
    res.status(200).json({ pageTitle: "Creeaza Atractie"}); 
}; 

/* 
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
.optional({ checkFalsy: true })
.escape(), 
body("adress")
.trim()
.optional({ checkFalsy: true })
.isString()
.escape(), 

*/

exports.place_create_post  = async (req, res) => { 
        upload(req, res, async (err) => { 
            console.log(req.body); 
            if(err)  { 
                console.log(err);
            }  
            else { 
                //Format array of files returned in req 
                const dataFiles = []; 
                if(req.files) { 
                    const files = req.files;
                    files.forEach(file => { 
                        dataFiles.push(fs.readFileSync(`../uploads/${files[files.indexOf(file)].filename}`)); 
                    }); 
                }

                //Creating new place
                const place = new Place({ 
                    title: req.body.title, 
                    description: req.body.description, 
                    type: req.body.type, 
                    photo: { 
                        data: dataFiles, 
                        contentType: "image/jpg", 
                    }, 
                });         
    
                if(req.body.history) { 
                    place.history = req.body.history
                }; 

                if(req.body.contact) { 
                    place.contact = req.body.contact; 
                }

                if(req.body.city) { 
                    place.city = req.body.city; 
                }; 

                if(req.body.adress) { 
                    place.adress = req.body.adress; 
                }

                if(req.body.program) { 
                    place.program = req.body.program; 
                }

                console.log("DONE"); 
                await place.save(); 
                res.status(200).json({ place: place, message: "Successfully uploaded"}); 
            }
        })
    }


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



