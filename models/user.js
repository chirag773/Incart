var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var UserSchema = new mongoose.Schema({
  username: String,
  password:String,
  
Orders:[{
id:{
type : mongoose.Schema.Types.ObjectId,
ref : "Order"
},
// ProductImage:String,
// OrderName:String,
// PlacedOn:Date,
// Price:Number,
// ProductSize:Number,
// ProductQuantity:{type:Number,default:0},
  ProductName:String,
ProductPrice :Number,
ProductImage:String,
ProductQuantity:{type:Number,default:1},
  ProductSize:String,
AreaPincode:Number,
ShippingAddress:String,
UserFullName:String,
UserPhoneNo:String,
City:String,
State:String,
OrderPlacedOn:{type:Date,default:Date.now},
Delivered:{type:Boolean,default:false},
BuyedByUser:String
}]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema) 