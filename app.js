var express           = require('express');
var app               = express();
var bodyParser        = require('body-parser');
var mongoose          = require('mongoose');
var passport          = require('passport');
var LocalStrategy     = require('passport-local');
var flash             = require('connect-flash');
// var Campground        = require("./models/campground");
var Product           = require("./models/product");
var User              = require("./models/user");
// var seedDB            = require("./seeds");
// var campgroundRoutes  = require("./routes/campground");
// var commentRoutes     = require("./routes/comment");
var indexRoutes       = require("./routes/index");
var methodOverride    = require('method-override'); 
// app.use(express.static(__dirname + "/public"));
var Order             = require("./models/order");

// seedDB(); terminate seeds//
mongoose.connect("mongodb://localhost/ecommerce", {
  useMongoClient: true
});
app.use(methodOverride("_method"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended: true}));


//================================================PASSPORT CONFIGURATION==================================================//


app.use(require("express-session")({
  secret:"THIS IS SECRET",
  resave:false,
  saveUninitialized:false
}));


app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

/////passing "currentUser" to every template/////////////////
app.use(function(req,res,next){
  res.locals.currentUser = req.user;
  res.locals.message = req.flash("error");
  next();
})




//==================================================RESTFUL ROUTES=========================================================//

app.use(indexRoutes);
// app.use(campgroundRoutes);
// app.use(commentRoutes);



//=============================================================product create by admin=============================//

app.get("/products",function(req,res){
  Product.find({},function(err,products){
    if(err){
      console.log(err)
    } else{
      res.render("products",{products:products});
    }
  })
});

app.post("/products",function(req,res){
  var ProductName = req.body.ProductName;
   var ProductPrice = req.body.ProductPrice;
  var ProductImage = req.body.ProductImage
  var ProductDescription = req.body.ProductDescription;
  var newProduct = {ProductName: ProductName, ProductPrice: ProductPrice, ProductImage: ProductImage, ProductDescription: ProductDescription}
  Product.create(newProduct,function(err,newlyProduct){
    if(err){
      console.log(err)
    }else{
      res.redirect("products")
    }
  })
  });

app.get("/products/newProduct",function(req,res){
  res.render("newProduct")
});


//==========================================================show page=========================================//

app.get("/products/:id",function(req,res){
  Product.findById(req.params.id,function(err,foundProduct){
    if(err){
      console.log(err);
    }else{
      res.render("show",{product:foundProduct});
    }
  });
});

//======================================================buy now================================================================//


app.get('/myOrders',function(req,res){
  
  User.findById(req.user._id,function(err,user){
    if (err) {
      console.log(err);
    } else {
      
          Order.find({},function(err,orders){
    if (err) {
      console.log(err);
    } else {
      
    res.render('myOrders',{user:user,orders:orders});
    }
              })
      
      
      
      
//         res.render('myOrders',{user:user});
    }
  })
});


//=============================================================buyy now post routes=========================================//


app.post("/products/:id/myOrders",function(req,res){
  
  Product.findById(req.params.id,function(err,product){
    if (err) {
      console.log(err);
    } else {
       
      User.findById(req.user.id,function(err,users){
        if (err) {
          console.log(err);
        } else {
          
           var ProductName   = req.body.ProductName;
           var ProductPrice = req.body.ProductPrice;
           var ProductImage  = req.body.ProductImage;
           var ProductQuantity = req.body.ProductQuantity;
           var ProductID       = req.body.ProductID;
           var ProductSize   = req.body.ProductSize;
           var AreaPincode   = req.body.AreaPincode;
           var ShippingAddress = req.body.ShippingAddress;
           var UserFullName    = req.body.UserFullName;
           var UserPhoneNo      = req.body.UserPhoneNo;
           var BuyedByUser      = req.body.UserFullName;
        
           
    
          var newOrder = {
            ProductName:ProductName,
            ProductPrice:ProductPrice,
            ProductImage:ProductImage,
            ProductSize:ProductSize,
            ProductQuantity:ProductQuantity,
            ProductID:ProductID,
            AreaPincode:AreaPincode,
            ShippingAddress:ShippingAddress,
            UserFullName:UserFullName,
            UserPhoneNo:UserPhoneNo,
            BuyedByUser:BuyedByUser
          }
          
        
    Order.create(newOrder,function(err,createdOrder){
      if (err) {
        console.log(err);
      } else {
        
        User.findById(req.user._id,function(err,users){
          if (err) {
            console.log(err);
          } else {
            
            var OrderInfo = {
              id:createdOrder._id,
//               OrderName:createdOrder.ProductName,
//               ProductImage:createdOrder.ProductImage,
//               PlacedOn:createdOrder.OrderPlacedOn,
//               ProductSize:createdOrder.ProductSize,
//               Price:createdOrder.ProductPrice,
//               ProductQuantity:createdOrder.ProductQuantity
              ProductName:createdOrder.ProductName,
            ProductPrice:createdOrder.ProductPrice,
            ProductImage:ProductImage,
            ProductSize:createdOrder.ProductSize,
            ProductQuantity:createdOrder.ProductQuantity,
            ProductID:createdOrder.ProductID,
            AreaPincode:createdOrder.AreaPincode,
            ShippingAddress:createdOrder.ShippingAddress,
            UserFullName:createdOrder.UserFullName,
            UserPhoneNo:createdOrder.UserPhoneNo,
            BuyedByUser:createdOrder.BuyedByUser
            }
            
            users.Orders.push(OrderInfo);
            users.save();
            
        Product.find({},function(err,products){
    if (err) {
      console.log(err);
    } else {
      res.redirect("/products");
    }
  })       
          }
        })
      }
    })       
        }
      })
      
    }
  }) 
});



///////////////////delete routes////////////////////////////////////

app.delete("/myOrders/:id",function(req,res){
  Order.findByIdAndRemove(req.params.id, function(err){
     if(err){
    console.log(err)
} else{
  res.redirect("/myOrders");
  }
   });
});

app.get("/order/:id",function(req,res){
  Order.findById(req.params.id,function(err,order){
    if(err){
      console.log(err)
    }else{
      res.redirect("/order/"+ req.params.id)
    }
  })
});






app.listen(3000, function () {
  console.log('Server started at port 3000');
});