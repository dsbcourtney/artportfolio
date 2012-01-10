/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Artist = new Schema({
  slug        : { type: String, lowercase: true, trim: true, unique: true},
  name        : { type : String, index : true},
  biography   : String,
  dateAdded   : Date,
  dateUpdated : Date,
  websiteUrl  : String
});


var ArtCollection = new Schema({
  slug              : { type: String, lowercase: true, trim: true, unique: true},
  title             : {type: String, index: true},
  releaseDate       : Date
});


var Artwork = new Schema({
  slug  : { type: String, lowercase: true, trim: true, unique: true},
  title : String,
  type      : String,
  description : String,
  artist : Schema.ObjectId,
  inCollection : [ArtCollection],
  totalEditions : Number,
  format :[
    {
      type : String,
      detail : String,
      printsRun : Number,
      width : Number,
      height : Number,
      price : Number
    },
    {
      type : String,
      detail : String,
      printsRun : Number,
      width : Number,
      height : Number,
      price : Number
    },
    {
      type : String,
      detail : String,
      printsRun : Number,
      width : Number,
      height : Number,
      price : Number
    },
    {
      type : String,
      detail : String,
      printsRun : Number,
      width : Number,
      height : Number,
      price : Number
    },
    {
      type : String,
      detail : String,
      printsRun : Number,
      width : Number,
      height : Number,
      price : Number
    }
  ],
  image:{
    max200px  : String,
    max500px  : String,
    max800px  : String,
    large     : String
  },
  tag:[String]
});

/**
 * Plugins
 */

function slugGenerator (options){
  options = options || {};
  var key = options.key || 'title';

  return function slugGenerator(schema){
    schema.path(key).set(function(v){
      this.slug = v.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '');
      return v;
    });
  };
};

Artist.plugin(slugGenerator({key : 'name'}));

mongoose.model('Artist', Artist);
mongoose.model('Artwork', Artwork);
mongoose.model('Collection', ArtCollection);

module.exports = mongoose;