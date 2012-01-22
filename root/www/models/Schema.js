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
  featured    : ObjectId,
  dateAdded   : {type :Date, 'default': new Date()},
  dateUpdated : {type :Date, 'default': new Date()},
  websiteUrl  : String,
  status       : { type: String, 'default':'offline'}
});


var Artwork = new Schema({
  slug  : { type: String, lowercase: true, trim: true, unique: true},//, 
  title : String,
  type      : String,
  description : String,
  artist : Schema.ObjectId,
  format :[Format],
  totalEditions : Number,
  format :[
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
    max1024px  : String
  },
  tag:[String],
  released : Date,
  featured : Boolean,
  dateAdded   : {type :Date, 'default': new Date()},
  dateUpdated : {type :Date, 'default': new Date()},
  status       : { type: String, 'default':'offline'}
});


var Format = new Schema({
  type : String,
  detail : String,
  printsRun : Number,
  width : Number,
  height : Number,
  price : Number
});

var Visitor = new Schema({
  email  : { type: String, lowercase: true, trim: true, unique: true},
  title : String,
  firstName :  String,
  lastName : String,
  mobile : String,
  newsletterOptIn: {type:Boolean, 'default': false},
  emailOptIn: {type:Boolean, 'default': false},
  dateAdded   : {type :Date, 'default': new Date()},
  dateUpdated : {type :Date, 'default': new Date()}
});


var User = new Schema({
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

Artist.plugin(slugGenerator({key : 'name'}));
Artwork.plugin(slugGenerator({key : 'title'}));
User.plugin(slugGenerator({key : 'email'})); // What if we want the slug to be the name but the key to be the email

mongoose.model('Artist', Artist);
mongoose.model('Artwork', Artwork);
mongoose.model('Format', Format);
mongoose.model('User', User);

module.exports = mongoose;