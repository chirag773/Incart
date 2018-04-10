var  mongoose = require('mongoose');
var passportLocalMongoose = require('passport-local-mongoose');

var OrderSchema = new mongoose.Schema({


// Category:String,
ProductID:{ 
  id:{ type : mongoose.Schema.Types.ObjectId,
       ref : "Product" }
},
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
});





module.exports = mongoose.model("Order",OrderSchema);