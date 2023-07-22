var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var CaseSchema = new Schema(
  {
    a05applicantID:{type:Schema.Types.ObjectID,required:false},
    a10activityID:{type:Schema.Types.ObjectID,required:false},
    a15casename:{type:String,required:false},
    a20caseaddress:{type:String,required:false},
    a25caseGPS:{type:String,required:false},
    a30caseunit:{type:String,required:false},
    a35scale:{type:Number,required:false},
    a40loyalistID:{type:Array,required:false},
    a55pass:{type:Boolean,required:false},
    a60right:{type:Number,required:false},
    a99footnote:{type:String,required:false}
  }
);

// Virtual for case's URL
CaseSchema
.virtual('url')
.get(function () {
  return '/case/' + this._id;
});
CaseSchema.set("toJSON",{getters:true,virtual:true});
CaseSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Case', CaseSchema);
