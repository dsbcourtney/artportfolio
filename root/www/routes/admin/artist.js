function artistAdminRoutes(app, mongoose, vdp) {

  //read all artists
  app.get('/admin/artists', function (req, res) {
    var locals = {title:'Art Rebellion Admin: List Artists', pageTitle:'List Artists'}
            , Artist = mongoose.model('Artist');

    //find all artists
    Artist.find({}, function (err, artists) {
      if (err) {
        res.send(err, 500);
      }

      locals.artists = artists;
      vdp.getAdminViewData(thenRender, 'admin/artist-list.jade', locals, req, res);
    });
  });


  //show single artist form
  app.get('/admin/artists/new', function (req, res) {

    //Get an Artist Model instance
    var Artist = mongoose.model('Artist')
            , newArtist = new Artist()
            , locals = {  title:'Art Rebellion Admin: Add Artist',
      pageTitle:'Add Artist',
      method:"POST",
      methodOverride:null,
      formAction:"/admin/artists/",
      artist:newArtist};

    vdp.getAdminViewData(thenRender, 'admin/artist-form.jade', locals, req, res);
  });


  //read single artist into form
  app.get('/admin/artists/:artistSlug', function (req, res) {

    //Get an Artist Model instance
    var Artist = mongoose.model('Artist'),
        Artwork = mongoose.model('Artwork');

    var locals = {  title:'Art Rebellion: [Artist Name]',
                    pageTitle:'[Artist Name]',
                    method:"POST",
                    methodOverride:"PUT"};

    Artist.findOne({slug:req.params.artistSlug}, function (err, artist) {

      locals.formAction = "/admin/artists/" + artist.slug;
      locals.artist = artist;
      
      Artwork.find({artist : artist._id}, function(err, artwork){
        locals.artistArtworks = artwork;
      });


      vdp.getAdminViewData(thenRender, 'admin/artist-form.jade', locals, req, res);
    });
  });


  //create artist
  app.post('/admin/artists/', function (req, res) {
    console.log(req.body);

    //Get an Artist Model instance
    var Artist = mongoose.model('Artist');
    var newArtist = new Artist(req.body.artist);

    newArtist.save(function (err) {
      if (err) {
        res.send(err, 500);
        return;
      }

      res.redirect('/admin/artists');
    });
  });


  //update single artist
  app.put('/admin/artists/:artistSlug', function (req, res) {

    var Artist = mongoose.model('Artist');
    var Artwork = mongoose.model('Artwork');

    req.body.artist.slug = mongoose.utilities.getSlug(req.body.artist.name);

    //HACK
    //need to explicitly set the value to false?
    req.body.artist.featured = (req.body.artist.featured == "on");

    Artist.update({slug:req.params.artistSlug}, req.body.artist, {multi:false, upsert:false}, function (err) {

      if (err) {
        res.send(err, 500);
        return;
      }

      res.redirect('/admin/artists');
     
    });
  });


  /* --- --- --- partials / ajax handlers --- --- --- */
  //delete single artist
  app.del('/admin/artists/:artistSlug', function (req, res) {

    var Artist = mongoose.model('Artist');
    var Artwork = mongoose.model('Artwork');
    var result = {result:'success'};

    Artist.findOne({slug:artistSlug}, function (err, artist) {
      if (err) {
        //throw err;
        result.err = err;
        result.result = 'error';
        res.send(result);
      }

      artist.remove();

      Artwork.update({artist:artist.slug}, {artist:null}, function (updateError) {

        if (updateError) {
          //throw err;
          result.err = err;
          result.result = 'error';
          res.send(result);
          return;
        }

        res.send(result);
      });
    });
  });

}

module.exports = artistAdminRoutes;

/* --- --- --- private helper methods --- --- --- */

function thenRender(template, model, res) {
  res.render(template, model);
}
