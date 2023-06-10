var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var MethodSchema = new Schema(
  {
    a05activityID:{type:Schema.Types.ObjectID,required:false},
    a10loyalistID:{type:Schema.Types.ObjectID,required:false},
    a15subact_old:{type:Array,required:false},
    a20subact_new:{type:Array,required:false},
    a25different:{type:String,required:false},
    a30baseline:{type:Array,required:false},
    a35dataneed:{type:Array,required:false},
    a40formula:{type:String,required:false},
    a99footnote:{type:String,required:false}
  }
);

// Virtual for method's URL
MethodSchema
.virtual('url')
.get(function () {
  return '/base4dcarbon/method/' + this._id;
});
MethodSchema.set("toJSON",{getters:true,virtual:true});
MethodSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Method', MethodSchema);
