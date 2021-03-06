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
  keyArtwork  : { type: Schema.ObjectId, ref : 'Artwork'},
  status      : { type: String, 'default':'offline'}
});


var Format = new Schema({
  hash : {type:String, lowercase: true, trim: true},
  type : String,
  detail : String,
  printsRun : Number,
  width : Number,
  height : Number,
  price : Number,
  stock : {type: Number, 'default' : 0}
});


var Artwork = new Schema({
  slug  : { type: String, lowercase: true, trim: true, unique: true},//, 
  title : String,
  type      : String,
  description : String,
  artist : {type: Schema.ObjectId, ref : 'Artist'},
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

// Shopping Cart Schema
var Cart = new Schema({
	id : Number,
	sessId : String,
	prodId : String,
	prodName : String,
	prodPrice : Number,
	dateAdded : { type: Date, 'default': new Date()},
	quantity : Number,
	orderId : Number,
	completed : { type : Boolean, 'default':false },
	visitor : String
});

/**
 * Plugins
 */

mongoose.utilities = {};

mongoose.utilities.getSlug = function(v) {
  return v.toLowerCase().replace(/[^a-z0-9]/g, '').replace(/-+/g, '');
};

mongoose.utilities.getFormatHash = function(f) {
  var hash = '';
  
  hash = [f.type, f.detail, f.height, f.width].join('|');
  
  return hash;
};

function createFormatHashes(schema, options){
  schema.pre('save', function (next) {
    this.lastMod = new Date
    next()
  })  
}

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
Artwork.plugin(createFormatHashes);
Visitor.plugin(slugGenerator({key : 'email'})); // What if we want the slug to be the name but the key to be the email
Cart.plugin(slugGenerator({key : 'id'}));

mongoose.model('Artist', Artist);
mongoose.model('Format', Format);
mongoose.model('Artwork', Artwork);
mongoose.model('Visitor', Visitor);
mongoose.model('Cart', Cart);

module.exports = mongoose;