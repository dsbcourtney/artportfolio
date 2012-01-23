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
  dateAdded   : {type :Date, 'default': new Date()},
  dateUpdated : {type :Date, 'default': new Date()},
  websiteUrl  : String,
  featured    : Boolean,
  status      : { type: String, 'default':'offline'}
});


var Artwork = new Schema({
  slug  : { type: String, lowercase: true, trim: true, unique: true},//, 
  title : String,
  type      : String,
  description : String,
  artist : String,
  totalEditions : Number,
  format :[Format],
  image:{
    max200px  : String,
    max500px  : String,
    max800px  : String,
    max1024px  : String
  },
  tag:[String],
  released : Date,
  dateAdded   : {type :Date, 'default': new Date()},
  dateUpdated : {type :Date, 'default': new Date()},
  featured    : Boolean,
  status      : { type: String, 'default':'offline'}
});

var Format = new Schema({
  hash : {type:String, lowercase: true, trim: true, unique: true},
  type : String,
  detail : String,
  printsRun : Number,
  width : Number,
  height : Number,
  price : Number,
  stock : {type: Number, 'default' : 0}
});

var Visitor = new Schema({
  slug        : { type: String, lowercase: true, trim: true, unique: true},
  firstname : { type: String },
  lastname : { type: String },
  email : { type: String },
  mobile : { type: String },
  pass : { type: String },
  newsletterOptIn : { type: Boolean, 'default':false },
  emailsOptIn : { type: Boolean, 'default':false },
  dateAdded   : {type :Date, 'default': new Date()},
  dateUpdated : {type :Date, 'default': new Date()},
  loggedIn : {type: Boolean, 'default':false },
  dateLoggedIn : {type :Date, 'default': new Date()}
});

/**
 * Plugins
 */

mongoose.utilities = {};

mongoose.utilities.getSlug = function(v) {
  return v.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '');
};

mongoose.utilities.getFormatHash = function(prefix, f) {
  var hash = '',
    ignores = ['hash', 'printsRun', 'price', 'stock'];
  
  for(var prop in f){
    if(f.hasOwnProperty(prop) && ignores.indexOf(prop) === -1){
      hash += prop.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '') + ':' + 
              f[prop].toString().toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '') + '|';    
    }
  }
  
  return prefix + "_" + hash;
};

function slugGenerator(options) {
  options = options || {};
  var key = options.key || 'title';

  return function slugGenerator(schema) {
    schema.path(key).set(function(v) {
      this.slug = mongoose.utilities.getSlug(v);//v.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '');
      return v;
    });
  };
}

function formatHash(schema){
  this.hash = getFormatHash(this);
}

Artist.plugin(slugGenerator({key : 'name'}));
Artwork.plugin(slugGenerator({key : 'title'}));
Visitor.plugin(slugGenerator({key : 'email'})); // What if we want the slug to be the name but the key to be the email


mongoose.model('Artist', Artist);
mongoose.model('Artwork', Artwork);
mongoose.model('Format', Format);
mongoose.model('Visitor', Visitor);

module.exports = mongoose;