var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProductSchema = new Schema(
  {
    a03tempcode:{type:String,required:false},
    a08industry:{type:String,required:false},
    a10part:{type:String,required:false},
    a30itemCh:{type:String,required:false},
    a35itemEn:{type:String,required:false},
    a99footnote:{type:String,required:false}
  }
);

// Virtual for poduct's URL
ProductSchema
.virtual('url')
.get(function () {
  return '/poduct/' + this._id;
});
ProductSchema.set("toJSON",{getters:true,virtual:true});
ProductSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Product', ProductSchema);
