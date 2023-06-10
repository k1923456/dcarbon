var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SubactSchema = new Schema(
  {
    a05activityID:{type:Schema.Types.ObjectID,required:false},
    a10type:{type:String,required:false},
    a15nickname:{type:String,required:false},
    a20describe:{type:String,required:false},
    a25loyalistID:{type:Schema.Types.ObjectID,required:false},
    a99footnote:{type:String,required:false}
  }
);

// Virtual for subact's URL
SubactSchema
.virtual('url')
.get(function () {
  return '/base4dcarbon/subact/' + this._id;
});
SubactSchema.set("toJSON",{getters:true,virtual:true});
SubactSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Subact', SubactSchema);
