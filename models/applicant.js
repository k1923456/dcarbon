var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var ApplicantSchema = new Schema(
  {
    a05lastname:{type:String,required:false},
    a10firstname:{type:String,required:false},
    a15firmname:{type:String,required:false},
    a20position:{type:String,required:false},
    a25phone:{type:String,required:false},
    a30email:{type:String,required:false},
    a35tel:{type:String,required:false},
    a40address:{type:String,required:false},
    a99footnote:{type:String,required:false}
  }
);

// Virtual for applicant's URL
ApplicantSchema
.virtual('url')
.get(function () {
  return '/base4dcarbon/applicant/' + this._id;
});
ApplicantSchema.set("toJSON",{getters:true,virtual:true});
ApplicantSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Applicant', ApplicantSchema);
