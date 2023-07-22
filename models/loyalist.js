var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var LoyalistSchema = new Schema(
  {
    a05lastname:{type:String,required:false},
    a10firstname:{type:String,required:true},
    a15role:{type:String,required:false},
    a20tel:{type:String,required:false},
    a25phone:{type:String,required:false},
    a30email:{type:String,required:false},
    a35degree:{type:Array,required:false},
    a40resume:{type:Array,required:false},
    a45expertise:{type:Array,required:false},
    a50extra:{type:String,required:false},
    a99footnote:{type:String,required:false}
  }
);

// Virtual for loyalist's URL
LoyalistSchema
.virtual('url')
.get(function () {
  return '/loyalist/' + this._id;
});
LoyalistSchema.set("toJSON",{getters:true,virtual:true});
LoyalistSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Loyalist', LoyalistSchema);
