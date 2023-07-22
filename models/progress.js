var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ProgressSchema = new Schema(
  {
    a05caseID:{type:Schema.Types.ObjectID,required:false},
    a10stage:{type:String,required:false},
    a15when:{type:Date,required:false},
    a99footnote:{type:String,required:false}
  }
);

// Virtual for progress's URL
ProgressSchema
.virtual('url')
.get(function () {
  return '/progress/' + this._id;
});
ProgressSchema.set("toJSON",{getters:true,virtual:true});
ProgressSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Progress', ProgressSchema);
