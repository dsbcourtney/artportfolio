module.exports = function(app, mongoose) {

  app.get('/artists/:artistSlug', function(req, res) {
    res.render('artist.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]'});
  });

  //read all artists
  app.get('/admin/artists', function(req, res) {
    
    //Get an Artist Model instance
    var Artist = mongoose.model('Artist');

    //find all artists
    Artist.find({}, function(err, artists) {
      res.render('admin/artists-list.jade',
              {title : 'Art Rebellion Admin: List Artists', pageTitle: 'List Artists', artists:artists});
    });

  });

  //show single artist form
  app.get('/admin/artists/new', function(req, res) {

    //Get an Artist Model instance
    var Artist = mongoose.model('Artist');
    var newArtist = new Artist();
    
    res.render('admin/artist-form.jade', {title : 'Art Rebellion Admin: Add Artist', pageTitle: 'Add Artist', method:"POST",
      artist: newArtist});
  });

  //read single artist into form
  app.get('/admin/artists/:artistSlug', function(req, res) {
    
    //Get an Artist Model instance
    var Artist = mongoose.model('Artist');

    Artist.findOne({slug:req.artistSlug}, function(err, artist){
      res.render('admin/artist-form.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]', method:"PUT", artist:artist});      
    });
  });

  //create artist
  app.post('/admin/artists/', function(req, res) {
    console.log(req.body);

    //Get an Artist Model instance
    var Artist = mongoose.model('Artist');
    var newArtist = new Artist(req.body.artist);

    newArtist.save();
    res.redirect('/admin/artists');
    //res.render('artist.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]'});
  });

  //update single artist
  app.put('/admin/artists/:artistSlug', function(req, res) {
    res.render('artist.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]'});
  });

  //update single artist
  app.del('/admin/artists/:artistSlug', function(req, res) {
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