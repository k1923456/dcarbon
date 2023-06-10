var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ActivitySchema = new Schema(
  {
    a05productID:{type:Schema.Types.ObjectID,required:false},
    a10type:{type:String,required:false},
    a15nickname:{type:String,required:false},
    a20describe:{type:String,required:false},
    a99footnote:{type:String,required:false}
  }
);

// Virtual for activity's URL
ActivitySchema
.virtual('url')
.get(function () {
  return '/base4dcarbon/activity/' + this._id;
});
ActivitySchema.set("toJSON",{getters:true,virtual:true});
ActivitySchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Activity', ActivitySchema);
