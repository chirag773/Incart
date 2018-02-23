var  mongoose = require('mongoose');


var ProductSchema = new mongoose.Schema({

ProductName:String,
ProductPrice :Number,
ProductImage:String,
// SideImage:String,
// BackImage:String,
ProductDescription:String,
// Rating:String,
  
// Reviews:[{
// id:{
// type : mongoose.Schema.Types.ObjectId,
// ref : "User"
// },
// Review:String,
// username: String,
// }]   


});



module.exports = mongoose.model("Product",ProductSchema);