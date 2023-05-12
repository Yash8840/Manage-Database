const Road = require("../models/road"); 
import upload from "../middleware/upload_multer";

exports.roads_list = async (req, res, next) => { 
    try { 
        const roads = await Road.find({}).exec(); 
        res.status(200).json({roads: roads}); 
    } catch(err) { 
        console.log(err); 
    } 
};  

exports.road_detail = async (req, res, next) => { 
    try {
        const road = await Road.findById(req.params.id) 
            .populate("places")
            .exec(); 

        res.status(200).json({ road: road, roadPlaces: road.places });  
    } catch { 

    }
}; 

exports.road_create_get = (req, res, next) => { 
    res.send("pageTitle create GET"); 
}; 

exports.road_create_post = async (req, res, next) => {
    upload(req, res, async(err) => { 
        if(err) { 
            console.log(err); 
            console.log(req.body); 
            console.log(req.files); 
        } else { 
            const dataFiles = []; 
            if(req.files) { 
                const files = req.files;
                files.forEach(file => { 
                    dataFiles.push(fs.readFileSync(`../uploads/${files[files.indexOf(file)].filename}`)); 
                }); 
            }; 

            const placesDocs = []; 
            if(req.body.places) { 
                const places = req.body.places; 
                places.forEach(place => { 
                    placesDocs.push(place._id); 
                })
            }; 

            const newRoad = new Road({ 
                title: req.body.title,  
                description: req.body.description, 
                places:  placesDocs, 

                photo: { 
                    data: dataFiles, 
                    contentType: "image/jpg", 
                }
            }); 

            await newRoad.save(); 
            res.status(200).json({ successfull_message: "Road added."}); 
        }
    })
}

exports.road_delete = async (req, res, next) => { 
    const road = await Road.findById(req.params.id).exec(); 

    if(road) { 
        await Road.deleteOne({ _id: road._id }).exec(); 
        res.status(200).json({ deletedRoad: road, deleted_message: "road deleted successfully"}); 
    }
}; 

exports.road_update_get = (req, res, next) => { 
    res.send("road update")
}; 

exports.road_update_put = (req, res, next) => { 
    res.send("road update PUT")
}