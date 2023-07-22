var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ReportSchema = new Schema(
  {
    a05caseID:{type:Schema.Types.ObjectID,required:false},
    a10loyalistID:{type:Schema.Types.ObjectID,required:false},
    a15reporttime:{type:Date,required:false},
    a20conclusion:{type:String,required:false},
    a25filetype:{type:String,required:false},
    a30filename:{type:String,required:false},
    a35reporthash:{type:String,required:false},
    a40reportblock:{type:Number,required:false},
    a99footnote:{type:String,required:false}
  }
);

// Virtual for report's URL
ReportSchema
.virtual('url')
.get(function () {
  return '/report/' + this._id;
});
ReportSchema.set("toJSON",{getters:true,virtual:true});
ReportSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Report', ReportSchema);
