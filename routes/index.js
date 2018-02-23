var express   = require('express');
var router    = express.Router();
var passport  = require("passport");
var User      = require("../models/user");



//==============================================================root rout================================================//
router.get("/",function(req, res){
  res.render("home");
 });

//==============================================================USER route================================================//


//==============================================================signup route================================================//

router.get("/register", function(req, res){
  res.render("register");
});




router.post("/register",function(req,res){
  var newUser = new User({username:req.body.username});
  var password = req.body.password; 
  User.register(newUser, password, function(err, user){
    if(err){
      console.log(err);
//       return res.render("ca/register");
    } else{
       passport.authenticate("local")(req, res, function(){
       res.redirect("/");
    });
    }
  });
});


// //==============================================================login route================================================//

router.get("/login",function(req, res){
  res.render("login");
});


router.post("/login", passport.authenticate("local",{
  successRedirect:"/",
  failureRedirect:"/login"
}), function(req,res){
});

//==============================================================logout route================================================//

router.get("/logout",function(req,res){
    req.logout();
    res.redirect("/login");
});

//==============================================================middleware================================================//

function isLoggedIn(req,res,next){
  if(req.isAuthenticated()){
    return next();
  }else{
    res.redirect("/login");
  }
}

module.exports = router;