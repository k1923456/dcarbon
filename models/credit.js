var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CreditSchema = new Schema(
  {
  a05caseID:{type:Schema.Types.ObjectID,required:false},
  a10when:{type:Date,required:false},
  a15totalcredit:{type:Number,required:false},
  a20enforce:{type:Date,required:false},
  a25expire:{type:Date,required:false},
  a30credithash:{type:String,required:false},
  a35creditblock:{type:Number,required:false},
  a40tracelink:{type:String,required:false},
  a45nowhash:{type:String,required:false},
  a50nowblock:{type:Number,required:false},
  a55holder:{type:String,required:false},
  a60share:{type:Number,required:false},
  a65contract:{type:String,required:false},
  a99footnote:{type:String,required:false}
  }
);

// Virtual for credit's URL
CreditSchema
.virtual('url')
.get(function () {
  return '/base4dcarbon/credit/' + this._id;
});
CreditSchema.set("toJSON",{getters:true,virtual:true});
CreditSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Credit', CreditSchema);
