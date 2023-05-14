const Road = require("../models/road"); 
const upload = require("../middleware/upload_multer"); 
const fs = require("fs");


exports.roads_list = async (req, res, next) => { 
    try { 
        const roads = await Road.find({}, { title: 1 }).exec(); 
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
            console.log(req.body); 
            console.log(err); 
        } else { 
            const placesDocs = req.body.places.split(","); 
            console.log(placesDocs); 

            const newRoad = new Road({ 
                title: req.body.title,  
                description: req.body.description, 
                places:  placesDocs, 
            }); 

            if(req.files) { 
                const dataFiles = []; 
                const files = req.files;
                files.forEach(file => { 
                    dataFiles.push(fs.readFileSync(`../uploads/${files[files.indexOf(file)].filename}`)); 
                }); 

                newRoad.photo = { 
                    data: dataFiles, 
                    contentType: "image/jpg", 
                }
            }; 


            await newRoad.save(); 
            res.status(200).json({ successfull_message: "Road added."}); 
        
    } } )
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