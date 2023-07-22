var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var AwardSchema = new Schema(
  {
    a05when:{type:Date,required:false},
    a10loyalistID:{type:Schema.Types.ObjectID,required:false},
    a15point:{type:Number,required:false},
    a20awardhash:{type:String,required:false},
    a25awardblock:{type:Number,required:false},
    a30nowhash:{type:String,required:false},
    a35nowblock:{type:Number,required:false},
    a40holder:{type:String,required:false},
    a45share:{type:Number,required:false},
    a99footnote:{type:String,required:false}
  }
);

// Virtual for award's URL
AwardSchema
.virtual('url')
.get(function () {
  return '/award/' + this._id;
});
AwardSchema.set("toJSON",{getters:true,virtual:true});
AwardSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Award', AwardSchema);
