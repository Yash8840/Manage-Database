const Event = require("../models/event"); 
const upload = require("../middleware/upload_multer"); 
const fs = require("fs"); 
var mongoose = require('mongoose');


exports.event_list = async (req, res, next) => { 
    try {  
        const events = await Event.find({}, { title: 1}).exec(); 
        res.status(200).json({ events }); 
    } catch(err) { 
        console.log(err); 
    }
}; 

exports.event_detail = async (req, res) => { 
    try { 
        const event = await Event.findById(req.params.id)
            .populate("places").exec(); 

        console.log(event.places); 
        res.status(200).json({ event }); 
    } catch(err) { 
        console.log(err); 
    }
}; 

exports.create_event_post = (req, res) => { 
    upload(req, res, async(err) => { 
        if(err) {  
            console.log(res.body);  
        } else { 
            const dataFiles = []; 
            if(req.files) { 
                const files = req.files;
                files.forEach(file => { 
                    dataFiles.push(fs.readFileSync(`../uploads/${files[files.indexOf(file)].filename}`)); 
                }); 
            }

            console.log(req.body);


            req.body.places = req.body.places.split(','); 
            req.body.places.pop(); 
            let placesDocs = [];
            
            for(let i = 0; i < req.body.places.length; i++) { 
                placesDocs.push(new mongoose.Types.ObjectId(`${req.body.places[i]}`)); 
            }
    
            const newEvent = new Event({ 
                title: req.body.title, 
                description: req.body.description, 
                photo: { 
                    data: dataFiles, 
                    contentType: "image/json", 
                }, 
                places: placesDocs, 
            }); 

            if(req.body.startDate) { 
                newEvent.startDate = req.body.startDate; 
            }; 

            if(req.body.stopDate) { 
                newEvent.stopDate = req.body.stopDate; 
            }

            await newEvent.save(); 
            res.status(200).json({ event: newEvent, successfull_message: "Event added successfully"}); 
        }
    })
}; 

exports.create_event_get = (req, res) => { 
    res.send("create event get"); 
}; 

exports.delete_event = async (req, res) => { 
    try { 
        const event = await Event.findById(req.params.id); 
        if(event) { 
            await Event.findByIdAndDelete(req.params.id); 
            res.status(200).json({ delete_message: "event deleted"}); 
        }
    } catch(err) { 
        console.log(err); 
    }
}; 

exports.update_event_get = (req, res) => { 
    res.send("update event get"); 
}; 

exports.update_event_put = (req, res) => {  
    res.send("update event put")
}