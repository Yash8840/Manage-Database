const express = require("express"); 
const router = express.Router(); 

const home_controller = require("../controllers/home_controller"); 
const city_controller = require("../controllers/city_controller"); 
const place_controller = require("../controllers/place_controller");    
const user_controller = require("../controllers/user_controller");
const auth_controller = require("../controllers/auth_controller"); 

router.get("/", home_controller.index); 

//Auth 

router.get("/login", auth_controller.login_get); 
router.post("/login", auth_controller.login_post); 

// Place Routes
router.get("/places/types", place_controller.place_types); 
router.get("/places/create", place_controller.place_create_get); 
router.post("/places/create", place_controller.place_create_post); 

router.get("/places/:id/update", place_controller.place_update_get); 
router.put("/places/:id/update", place_controller.place_update_post); 

router.get("/places", place_controller.place_list); 
router.get("/places/:id", place_controller.place_detail); 
router.delete("/places/:id", place_controller.place_delete_post); 

// City Routes 
router.get("/cities/create", city_controller.city_create_get); 
router.post("/cities/create", city_controller.city_create_post); 

router.put("/cities/:id/update", city_controller.city_update_post);
router.get("/cities/:id/update", city_controller.city_update_get); 

router.get("/cities", city_controller.city_list); 
router.get("/cities/:id", city_controller.city_detail); 
router.delete("/cities/:id", city_controller.city_delete_post); 

//Users 

router.get("/profiles/:id/update", user_controller.user_update_get); 
router.put("/profiles/:id/update", user_controller.user_update_put);

router.get("/profiles", user_controller.users_list); 
router.get("/profiles/:id",  user_controller.user_detail); 
router.delete("/profiles/:id", user_controller.user_delete); 

// Road Routes. 
// In work 

module.exports = router; 