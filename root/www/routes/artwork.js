var im = require('imagemagick'),
        imagesDir = '/Users/lewis/github/artportfolio/root/www/static/img/artwork',
        ImageTools = require('../models/ImageTools.js');

// http://nyteshade.posterous.com/posting-files-with-node-and-expressjs
module.exports = function(app, mongoose) {
  app.get('/artwork/:artistName/:collectionName/:artworkTitle', function(req, res) {
    res.render('artwork.jade', {title : 'Art Rebellion: [Artwork]', pageTitle: '[Artwork]'});
  });

  /* --- Routes --- --- */
  app.get('/admin/artwork/new.:format?', function(req, res) {
    res.render('admin/artwork-image-form.jade', {title : 'Art Rebellion: Add artwork images', pageTitle: 'Add artwork images'});
  });

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

  app.get('/admin/artwork.:format?', function(req, res) {

    //Get an Artist Model instance
    var Artwork = mongoose.model('Artwork'),
            pageTitle = 'Art Rebellion : Artwork';

    //find all artists
    Artwork.find({}, function(err, artworks) {
      if (err) {
        res.send(err, 500);
      }

      res.render('admin/artwork-list.jade', {title : pageTitle, pageTitle: pageTitle, artworks: artworks});
    });
  });
  
  app.get('/admin/artwork/:artworkSlug', function(req, res){
    var Artwork = mongoose.model('Artwork'),
            pageTitle;
    
    Artwork.findOne({slug : req.params.artworkSlug}, function(err, artwork){
      pageTitle = "Art Rebellion : Edit Artwork : " + artwork.title;
      res.render('admin/artwork-details-form.jade', {title : pageTitle, pageTitle: pageTitle, artwork: artwork});
    });
    
  });  
};

/* ---- ---- private helpers ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- ---- */
function createArtwork(res, mongoose, image, next) {
  var Artwork = mongoose.model('Artwork'),
          newArtwork, newTitle, newSlug;

  ImageTools.createCopies(image, function(imageFiles) {
    newTitle = 'unpublished art : ' + new Date().getTime();

    newArtwork = new Artwork({
      title : newTitle,
      image : imageFiles});

    newArtwork.save(function(err) {
      if (err) {
        //throw err;
        res.send(err, 500);
      }

      next()
    });
  })
}
