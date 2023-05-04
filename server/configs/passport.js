const passport = require("passport"); 
const LocalStrategy = require("passport-local").Strategy; 
const passportJWT = require("passport-jwt"); 
const JWTStrategy = passportJWT.Strategy; 
const ExtractJWT = passportJWT.ExtractJwt; 

const User = require("../models/user");

passport.use(new LocalStrategy({
    usernameField: "email", 
    passwordField: "password",
 }, async function(email, password, done) { 
    const user = await User.findOne({email: email}); 

    if(user == null) { 
        return done(null, false, { message: "No user with that email"}); 
    }; 

    try { 
        if(await bcrypt.compare(password, user.password)) { 
            return done(null, user, { message: "Logged in succesfully"}); 
        } else { 
            return done(null, false, { message: "Password incorrect"}); s
        }; 
    } catch (e) { 
        return done(e); 
    }
 
 })); 

 passport.use(new JWTStrategy({ 
    jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(), 
    secretOrKey: process.env.JWT_SECRET, 
 }, function (jwtPayload, done) { 
    return User.findOneById(jwtPayload.id).then(user => { 
        return done(null, user); 
    }).catch(err => {
        return done(err); 
    })
 } )) 