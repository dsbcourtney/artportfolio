module.exports = function(app, mongoose, vdp) {

  //TODO - some validation on the request data?
  app.get('/artists.:format?', function(req, res) {

    //Get an Artist Model instance
    var Artist = mongoose.model('Artist'),
            pageTitle = 'Art Rebellion : Artists';

    //find all artists
    Artist.find({}, function(err, artists) {
      if (err) {
        res.send(err, 500);
      }
      
      vdp.getAdminViewData(thenRender, 'artists.jade', locals);
    });
  });
  
  app.get('/artists/:artistSlug.:format?', function(req, res) {
    var locals = {}
      , Artist = mongoose.model('Artist');

    Artist.findOne({slug:req.params.artistSlug}, function(err, artist) {
       
      locals.title = 'Art Rebellion : ' + artist.name;
      locals.pageTitle = locals.title;
      locals.artists = artist;
      
      if (err || !artist) {
        res.send('not found', 404);
      }
      else {
        vdp.getPublicViewData(thenRender, 'artist.jade', locals, res);
      }
    });

  });

  /* --- --- --- 
   ADMIN >>
   REST compliant interface
   */

  //read all artists
  app.get('/admin/artists', function(req, res) {
    var locals = {title : 'Art Rebellion Admin: List Artists', pageTitle: 'List Artists'}
      , Artist = mongoose.model('Artist');
    
    //find all artists
    Artist.find({}, function(err, artists) {
      if (err) {
        res.send(err, 500);
      }
      
      locals.artists = artists;
      vdp.getAdminViewData(thenRender, 'admin/artist-list.jade', locals, res);
    });
  });

  //show single artist form
  app.get('/admin/artists/new', function(req, res) {

    //Get an Artist Model instance
    var Artist = mongoose.model('Artist')
      , newArtist = new Artist()
      , locals = {  title : 'Art Rebellion Admin: Add Artist', 
                    pageTitle: 'Add Artist',
                    method:"POST", 
                    methodOverride:null, 
                    formAction : "/admin/artists/",
                    artist: newArtist};

    vdp.getAdminViewData(thenRender, 'admin/artist-form.jade', locals, res);
  });

  //read single artist into form
  app.get('/admin/artists/:artistSlug', function(req, res) {

    //Get an Artist Model instance
    var Artist = mongoose.model('Artist')
      , locals = {  title : 'Art Rebellion: [Artist Name]', 
                    pageTitle: '[Artist Name]',
                    method:"POST", 
                    methodOverride:"PUT"};

    Artist.findOne({slug:req.params.artistSlug}, function(err, artist) {

      locals.formAction = "/admin/artists/" + artist.slug;
      locals.artist = artist;
      
      vdp.getAdminViewData(thenRender, 'admin/artist-form.jade', locals, res);
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
        res.send(err, 500);
      }

      res.redirect('/admin/artists');
    });
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
        res.send(err, 500);
      }

      res.redirect('/admin/artists');
    });
  });

  //delete single artist
  app.del('/admin/artists/:artistSlug', function(req, res) {
    //TODPO: implement delete
    var locals = {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]'};
    vdp.getAdminViewData(thenRender, 'admin/artists-form.jade', locals, res);
  });
};


/* --- --- --- private helper methods --- --- --- */

function thenRender(template, model, res){
  res.render(template, model);
}

