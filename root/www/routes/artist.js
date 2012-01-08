
module.exports = function(app, mongoose){

  app.get('/artist/:artistName', function(req, res){
   res.render('artist.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]'});
  });

  //read
  app.get('/admin/artist/', function(req, res){
   res.render('artist.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]'});
  });
  
  //create
  app.post('/admin/artist/:artistName', function(req, res){
   res.render('artist.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]'});
  });
  
  //update
  app.put('/admin/artist/:artistName', function(req, res){
   res.render('artist.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]'});
  });

  //delete
  app.del('/admin/artist/:artistName', function(req, res){
   res.render('artist.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]'});
  });
  
};

/*
var Artist = mongoose.model('Artist');

var tempArtist = new Artist({
  slug        : "temp-artist1",
  name        : "Artist Name",
  biography   : "biography",
  dateAdded   : new Date(),
  dateUpdated : new Date(),
  websiteUrl  : "http://www.domain.com"
});

tempArtist.save();

*/