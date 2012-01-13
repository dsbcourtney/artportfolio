/**
 * Module dependencies.
 */

var mongoose = require('mongoose')
<<<<<<< HEAD
<<<<<<< HEAD
    , Schema = mongoose.Schema
    , ObjectId = Schema.ObjectId;

var Artist = new Schema({
    slug        : { type: String, lowercase: true, trim: true, unique: true},
    name        : { type : String, index : true},
    biography   : String,
    dateAdded   : {type :Date, 'default': new Date()},
    dateUpdated : {type :Date, 'default': new Date()},
    websiteUrl  : String,
    state       : { type: String, 'default':'offline'}
=======
=======
>>>>>>> lewis_working
//  , artworkExtensions = require('./extensions/artwork.js')
  , Schema = mongoose.Schema
  , ObjectId = Schema.ObjectId;

var Artist = new Schema({
  slug        : { type: String, lowercase: true, trim: true, unique: true},
  name        : { type : String, index : true},
  biography   : String,
  dateAdded   : {type :Date, 'default': new Date()},
  dateUpdated : {type :Date, 'default': new Date()},
  websiteUrl  : String,
  state       : { type: String, 'default':'offline'}
<<<<<<< HEAD
>>>>>>> lewis_working
=======
>>>>>>> lewis_working
});


var ArtCollection = new Schema({
<<<<<<< HEAD
<<<<<<< HEAD
    slug              : { type: String, lowercase: true, trim: true, unique: true},
    title             : {type: String, index: true},
    releaseDate       : Date,
    state       : { type: String, 'default':'offline'}
=======
=======
>>>>>>> lewis_working
  slug              : { type: String, lowercase: true, trim: true, unique: true},  
  title             : {type: String, index: true},
  dateAdded   : {type :Date, 'default': new Date()},
  dateUpdated : {type :Date, 'default': new Date()},
  state       : { type: String, 'default':'offline'}
<<<<<<< HEAD
>>>>>>> lewis_working
=======
>>>>>>> lewis_working
});


var Artwork = new Schema({
<<<<<<< HEAD
<<<<<<< HEAD
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
    tag:[String],
    state       : { type: String, 'default':'offline'}
=======
=======
>>>>>>> lewis_working
  slug  : { type: String, lowercase: true, trim: true, unique: true},//, 
  title : String,
  type      : String,
  description : String,
  artist : Schema.ObjectId,
//  inCollection : [ArtCollection],
  totalEditions : Number,
  format :[
    {
      type : String,
      detail : String,
      printsRun : Number,
      width : Number,
      height : Number,
      released : Date,
      price : Number
    }
  ],
  image:{
    max200px  : String,
    max500px  : String,
    max800px  : String,
    max1024px  : String
  },
  tag:[String],
  dateAdded   : {type :Date, 'default': new Date()},
  dateUpdated : {type :Date, 'default': new Date()},
  state       : { type: String, 'default':'offline'}
<<<<<<< HEAD
>>>>>>> lewis_working
=======
>>>>>>> lewis_working
});

/**
 * Plugins
 */

mongoose.utilities = {};

mongoose.utilities.getSlug = function(v){
<<<<<<< HEAD
<<<<<<< HEAD
    return v.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '');
};

function slugGenerator (options){
    options = options || {};
    var key = options.key || 'title';

    return function slugGenerator(schema){
        schema.path(key).set(function(v){
            this.slug = mongoose.utilities.getSlug(v);//v.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '');
            return v;
        });
    };
}



Artist.plugin(slugGenerator({key : 'name'}));
=======
=======
>>>>>>> lewis_working
  return v.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '');
};

function slugGenerator (options){
  options = options || {};
  var key = options.key || 'title';

  return function slugGenerator(schema){
    schema.path(key).set(function(v){
      this.slug = mongoose.utilities.getSlug(v);//v.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '');
      return v;
    });
  };
}


Artist.plugin(slugGenerator({key : 'name'}));
Artwork.plugin(slugGenerator({key : 'title'}));
<<<<<<< HEAD
>>>>>>> lewis_working
=======
>>>>>>> lewis_working

mongoose.model('Artist', Artist);
mongoose.model('Artwork', Artwork);
mongoose.model('Collection', ArtCollection);

module.exports = mongoose;