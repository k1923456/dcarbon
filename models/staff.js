var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var StaffSchema = new Schema(
  {
    a05lastname:{type:String,required:false},
    a10firstname:{type:String,required:true},
    a15dateofjoin:{type:Date,required:false},
    a20department:{type:String,required:false},
    a25tel:{type:String,required:false},
    a30phone:{type:String,required:false},
    a30email:{type:String,required:false},
    a35institution:{type:String,required:false},
    a40position:{type:Array,required:false},
    a45address:{type:String,required:false},
    a50degree:{type:Array,required:false},
    a55resume:{type:Array,required:false},
    a60expertise:{type:Array,required:false},
    a65extra:{type:String,required:false},
    a99footnote:{type:String,required:false}
  }
);

// Virtual for staff's URL
StaffSchema
.virtual('url')
.get(function () {
  return '/base4dcarbon/staff/' + this._id;
});
StaffSchema.set("toJSON",{getters:true,virtual:true});
StaffSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Staff', StaffSchema);
