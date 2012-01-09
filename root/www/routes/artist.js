module.exports = function(app, mongoose) {

  app.get('/artists/:artistName', function(req, res) {
    res.render('artist.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]'});
  });

  //read all artists
  app.get('/admin/artists', function(req, res) {
    //

    var Artist = mongoose.model('Artist');

    Artist.find({}, function(err, artists) {
      res.render('admin/list-artists.jade',
              {title : 'Art Rebellion Admin: List Artists', pageTitle: 'List Artists', artists:artists});
    });

  });

  //create single artist form
  app.get('/admin/artists/new', function(req, res) {
    res.render('artist.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]'});
  });

  //read single artist
  app.get('/admin/artists/:artistId', function(req, res) {
    res.render('artist.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]'});
  });

  //create artist
  app.post('/admin/artists/', function(req, res) {
    res.render('artist.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]'});
  });

  //update single artist
  app.put('/admin/artists/:artistId', function(req, res) {
    res.render('artist.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]'});
  });

  //update single artist
  app.del('/admin/artists/:artistId', function(req, res) {
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