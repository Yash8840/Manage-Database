const express = require("express"); 
const router = express.Router(); 

const home_controller = require("../controllers/home_controller"); 
const city_controller = require("../controllers/city_controller"); 
const place_controller = require("../controllers/place_controller"); 
const road_controller = require("../controllers/road_controller"); 

router.get("/", home_controller.index); 