const Event = require("../models/event"); 
const upload = require("../middleware/upload_multer"); 
const fs = require("fs"); 

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
        const event = await Event.find(req.params.id)
            .populate("places"); 
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

            const placesDocs = req.body.places.split(','); 
            console.log(placesDocs); 
    
            const newEvent = new Event({ 
                title: req.body.title, 
                description: req.body.description, 
                photo: { 
                    data: dataFiles, 
                }, 
                places: placesDocs, 
            }); 

            await newEvent.save(); 
            res.status(200).json({ event: newEvent, successfull_message: "Event added successfully"}); 
        }
    })
}; 

exports.create_event_get = (req, res) => { 
    res.send("create event get"); 
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