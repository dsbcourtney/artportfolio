var im = require('imagemagick'),
        imagesDir = '/Users/lewis/github/artportfolio/root/www/static/img/artwork',
        ImageTools = require('../models/ImageTools.js');

// http://nyteshade.posterous.com/posting-files-with-node-and-expressjs
module.exports = function(app, mongoose, vdp) {
  
  //view artwork
  app.get('/artwork/:artistName/:artworkTitle', function(req, res) {
    var locals = {title : 'Art Rebellion: [Artwork]', pageTitle: '[Artwork]'};

    vdp.getPublicViewData(thenRender, 'artist.jade', locals, res);
  });


  /* ---Admin Routes --- --- */

  //upload artwork image form
  app.get('/admin/artwork/new.:format?', function(req, res) {
    var locals = {title : 'Art Rebellion: Add artwork images', pageTitle: 'Add artwork images'};
    
    vdp.getAdminViewData(thenRender, 'admin/artwork-image-form.jade', locals, res);
  });


  //upload artwork handler
  app.post('/admin/artwork.:format?', function(req, res) {

    var counter = 1;

    if (req.files.artImages[0] && req.files.artImages[0].type) {
      for (var i = 0; i < req.files.artImages.length; i++) {

        //TODO: sort our async issues 
        createArtwork(res, mongoose, req.files.artImages[i], function() {
          if (counter == req.files.artImages.length) {
            res.redirect('/admin/artwork');
          }

          counter++;
        });
      }
    }
    else {
      createArtwork(res, mongoose, req.files.artImages, function() {
        res.redirect('/admin/artwork');
      });
    }
  });


  //list all artwork
  app.get('/admin/artwork.:format?', function(req, res) {

    //Get an Artist Model instance
    var Artwork = mongoose.model('Artwork')
      , pageTitle = 'Art Rebellion : Artwork'
      , locals = {title : pageTitle, pageTitle: pageTitle};

    //find all artists
    Artwork.find({}, function(err, artworks) {
      if (err) {
        res.send(err, 500);
        return;
      }
      
      locals.artworks = artworks;

      vdp.getAdminViewData(thenRender, 'admin/artwork-list.jade', locals, res);
    });
  });


  //update artwork form
  app.get('/admin/artwork/:artworkSlug', function(req, res) {
    var Artwork = mongoose.model('Artwork')
      , pageTitle
      , locals = {  method:"POST", 
                    methodOverride:"PUT"};

    Artwork.findOne({slug : req.params.artworkSlug}, function(err, artwork) {

      locals.artwork = artwork;
      locals.formAction = "/admin/artwork/" + artwork.slug; 
      locals.title =  "Art Rebellion : Edit Artwork : " + artwork.title;
      locals.pageTitle = locals.title;
      
      vdp.getAdminViewData(thenRender, 'admin/artwork-details-form.jade', locals, res);
      
    });

  });


  //update artwork handler
  app.put('/admin/artwork/:artworkSlug', function(req, res) {

    var Artwork = mongoose.model('Artwork'), pageTitle;

    //create a new slug if needed.
    req.body.artwork.slug = mongoose.utilities.getSlug(req.body.artwork.title);
    
    req.body.artwork.tag = req.body.artwork.tag.split(','); 

    Artwork.update({slug:req.params.artworkSlug}, req.body.artwork, {multi:false, upsert:false}, function(err) {

      if (err) {
        res.send(err, 500);
      }

      res.redirect('/admin/artwork');
    });

  });

};

/* --- --- --- private helper methods --- --- --- */

function thenRender(template, model, res){
  res.render(template, model);
}


function createArtwork(res, mongoose, image, next) {
  var Artwork = mongoose.model('Artwork'),
          newArtwork, newTitle, newSlug;

  ImageTools.createCopies(image, function(imageFiles) {
    newTitle = 'unpublished art : ' + new Date().getTime();

    newArtwork = new Artwork({
      title : newTitle,
      image : imageFiles,
      type : 'original',
      description : 'A new piece of work',
      released : new Date(),
      format : [
        {type :  "original",
          detail : 'original',
          printsRun : 0,
          height : 0,
          width : 0,
          price : 100000.00}
      ]
    });

    newArtwork.save(function(err) {
      if (err) {
        //throw err;
        res.send(err, 500);
      }

      next()
    });
  })
}
