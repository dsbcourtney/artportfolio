module.exports = function(app, mongoose) {

  //TODO - some validation on the request data?
  app.get('/artists.:format?', function(req, res) {

    //Get an Artist Model instance
    var Artist = mongoose.model('Artist'),
            pageTitle = 'Art Rebellion : Artists';

    //find all artists
    Artist.find({}, function(err, artists) {
      res.render('admin/artists.jade', {title : pageTitle, pageTitle: pageTitle, artists: artists});
    });
  });

  app.get('/artists/:artistSlug.:format?', function(req, res) {
    //Get an Artist Model instance
    var Artist = mongoose.model('Artist');

    Artist.find({}, function(err, artists) {
    });

    Artist.findOne({slug:req.params.artistSlug}, function(err, artist) {
      if (err || !artist) {
        res.send('not found', 404);
      }
      else {
        res.render('artist.jade', {title : 'Art Rebellion: [' + artist.name + ']', pageTitle: '[' + artist.name + ']'});
      }
    });

  });

  /* --- --- --- 
   ADMIN >>
   REST compliant interface
   */

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

    res.render('admin/artist-form.jade', {title : 'Art Rebellion Admin: Add Artist', pageTitle: 'Add Artist',
      method:"POST", methodOverride:null, formAction : "/admin/artists/",
      artist: newArtist});
  });

  //read single artist into form
  app.get('/admin/artists/:artistSlug', function(req, res) {

    //Get an Artist Model instance
    var Artist = mongoose.model('Artist');

    Artist.findOne({slug:req.params.artistSlug}, function(err, artist) {
      res.render('admin/artist-form.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]',
        method:"POST", methodOverride:"PUT", formAction : "/admin/artists/" + artist.slug,
        artist:artist});
    });
  });

  //create artist
  app.post('/admin/artists/', function(req, res) {
    console.log(req.body);

    //Get an Artist Model instance
    var Artist = mongoose.model('Artist');
    var newArtist = new Artist(req.body.artist);

    newArtist.save(function(err) {
      if (err) {
        throw err;
      }

      res.redirect('/admin/artists');
      return;
    });

    throw 'shouldnt have got here';

    //res.render('artist.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]'});
  });

  //update single artist
  app.put('/admin/artists/:artistSlug', function(req, res) {

    var Artist = mongoose.model('Artist');

    //HACK
    //in case name has been updated, reset the slug value - could be some problems with 
    //duplicate keys though.
    req.body.artist.slug = mongoose.utilities.getSlug(req.body.artist.name);

    Artist.update({slug:req.params.artistSlug}, req.body.artist, {multi:false, upsert:false}, function(err) {

      if (err) {
        throw err;
      }

      res.redirect('/admin/artists');
    });

  });

  //update single artist
  app.del('/admin/artists/:artistSlug', function(req, res) {
    res.render('artist.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]'});
  });
};
