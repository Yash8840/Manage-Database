const jwt = require("jsonwebtoken"); 
const passport = require("passport"); 

/* POST LOGIN */
exports.login_get = (req, res, next) => { 
    res.send("NOT IMPLEMENTED: login page");  
}; 

exports.login_post = (req, res, next) => { 
    passport.authenticate("local", { session: false }, (err, user, info) => { 
        if(err) { 
            return res.status(400).json({ 
                message: 'Something is not right', 
                user: user,     
            })
        }; 

        req.login(user, { session: false }, (err) => { 
            if(err) res.send(err); 
        }); 

        //generate a signed son web token with the content of user objects 
        const token = jwt.sign(user, process.env.JWT_SECRET); 
        return res.json({ user, token }); 
    })(req, res); 
}
