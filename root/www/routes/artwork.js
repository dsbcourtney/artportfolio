var im = require('imagemagick'),
        imagesDir = '/Users/lewis/github/artportfolio/root/www/static/img/artwork',
        ImageTools = require('../models/ImageTools.js');

//https://github.com/rsms/node-imagemagick
// http://nyteshade.posterous.com/posting-files-with-node-and-expressjs
module.exports = function(app, mongoose) {
  app.get('/artwork/:artistName/:collectionName/:artworkTitle', function(req, res) {
    res.render('artwork.jade', {title : 'Art Rebellion: [Artwork]', pageTitle: '[Artwork]'});
  });

  /*
   --- --- ---
   ADMIN
   REST compliant interface

   */
  app.get('/admin/artwork/new', function(req, res) {
    res.render('admin/artwork-form.jade', {title : 'Art Rebellion: [Artwork]', pageTitle: '[Artwork]'});
  });

  app.post('/admin/artwork', function(req, res) {
    var Artwork = mongoose.model('Artwork'),
            newArtwork, newTitle, newSlug;

    //res.render('artwork.jade', {title : 'Art Rebellion: [Artwork]', pageTitle: '[Artwork]'});
    //console.dir(req.body);
    //console.dir(req.files);

    ImageTools.createCopies(req.files.artImages, function(images) {
      newTitle = 'unpublished art : ' + new Date().toLocaleTimeString();
//      newSlug = mongoose.utilities.getSlug(newTitle);
      
      console.dir('newSlug ' + newSlug);
      
      newArtwork = new Artwork({
        title : newTitle,
//        slug : newSlug,
        image : images});


      newArtwork.save(function(err){

        if(err){
          throw err;
        }
        
        res.send('ok');
      });

      
    })

  });
};