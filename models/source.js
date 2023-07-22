var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var SourceSchema = new Schema(
  {
    a05type:{type:String,required:false},
    a10fulltitle:{type:String,required:false},
    a15website:{type:String,required:false},
    a99footnote:{type:String,required:false}
  }
);

// Virtual for source's URL
SourceSchema
.virtual('url')
.get(function () {
  return '/source/' + this._id;
});
SourceSchema.set("toJSON",{getters:true,virtual:true});
SourceSchema.set("toObject",{getters:true,virtual:true});
//Export model
module.exports = mongoose.model('Source', SourceSchema);
