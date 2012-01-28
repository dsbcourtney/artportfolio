var im = require('imagemagick'),
        imagesDir = '/Users/lewis/github/artportfolio/root/www/public/img/artwork',
        ImageTools = require('../models/ImageTools.js');

// http://nyteshade.posterous.com/posting-files-with-node-and-expressjs
module.exports = function(app, mongoose, vdp) {

  //view artwork
  app.get('/artwork/:artistName/:artworkTitle', function(req, res) {
    var locals = {title : 'Art Rebellion: [Artwork]', pageTitle: '[Artwork]'};

    vdp.getPublicViewData(thenRender, 'artwork.jade', locals, req, res);
  });


  /* ---Admin Routes --- --- */

  //upload artwork image form
  app.get('/admin/artwork/new.:format?', function(req, res) {
    var locals = {title : 'Art Rebellion: Add artwork images', pageTitle: 'Add artwork images'};

    vdp.getAdminViewData(thenRender, 'admin/artwork-image-form.jade', locals, req, res);
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
        }, req.body.artist);
      }
    }
    else {
      createArtwork(res, mongoose, req.files.artImages, function() {
        res.redirect('/admin/artwork');
      }, req.body.artist);
    }
  });


  //list all artwork
  app.get('/admin/artwork.:format?', function(req, res) {

    //Get an Artist Model instance
    var Artwork = mongoose.model('Artwork')
            , pageTitle = 'Art Rebellion : Artwork';

    var locals = {
      title : pageTitle ,
      pageTitle : pageTitle ,
      scripts : ['/js/admin/artwork-list.js']
    };

    //find all artists
    Artwork.find({}, function(err, artworks) {
      if (err) {
        res.send(err, 500);
        return;
      }

      locals.artworks = artworks;

      vdp.getAdminViewData(thenRender, 'admin/artwork-list.jade', locals, req, res);
    });
  });


  //update artwork form
  app.get('/admin/artwork/:artworkSlug', function(req, res) {
    var Artwork = mongoose.model('Artwork')
            , pageTitle
            , locals = {  method:"POST",
      methodOverride:"PUT",
      scripts : ['/js/admin/artwork-details-form.js']};

    Artwork.findOne({slug : req.params.artworkSlug}, function(err, artwork) {

      locals.visitor = req.session.visitor;

      locals.artwork = artwork;
      locals.formAction = "/admin/artwork/" + artwork.slug;
      locals.title = "Art Rebellion : Edit Artwork : " + artwork.title;
      locals.pageTitle = locals.title;

      vdp.getAdminViewData(thenRender, 'admin/artwork-details-form.jade', locals, req, res);

    });

  });


  //update artwork handler
  app.put('/admin/artwork/:artworkSlug', function(req, res) {

    var Artwork = mongoose.model('Artwork'), pageTitle;

    //create a new slug if needed.
    req.body.artwork.slug = mongoose.utilities.getSlug(req.body.artwork.title);
    req.body.artwork.tag = req.body.artwork.tag.split(',');
    req.body.artwork.featured = (req.body.artwork.featured == "on");

    //mongoose.utilities.getFormatHash
    //TODO: figure out a way to add this as a Mongoose plugin.
    for (var i = 0; i < req.body.artwork.format.length; i++) {
      req.body.artwork.format[i].hash = mongoose.utilities.getFormatHash(req.body.artwork.format[i]);
    }

    Artwork.update({slug:req.params.artworkSlug}, req.body.artwork, {multi:false, upsert:false}, function(err) {

      if (err) {
        res.send(err, 500);
        return;
      }

      res.redirect('/admin/artwork');
    });

  });


  /* --- --- --- partials / ajax handlers --- --- --- */
  app.del('/admin/artwork/:artworkSlug', function(req, res) {

    var Artwork = mongoose.model('Artwork');

    Artwork.remove({slug : req.params.artworkSlug}, function(err) {
      var result = {};

      if (err) {
        result = {result: 'error', error:err};
      } else {
        result = {result: 'success'};
      }
      res.send(result);
      result = null;
    })
  });

  
  //add new format - partial ajax handler
  app.post('/admin/artwork/:artworkSlug/format/new.:format', function(req, res) {
    var Artwork = mongoose.model('Artwork'),
            Format = mongoose.model('Format');

    Artwork.findOne({slug : req.params.artworkSlug}, function(err, artwork) {
      if (err) {
        res.send(err, 500);
        return;
      }

      var format = new Format(
              {
                type :  "*unspecified*",
                detail : '*unspecified*',
                printsRun : 0,
                height : 0,
                width : 0,
                price : 999999.99,
                stock : 0
              });

      artwork.format.push(format);

      artwork.save(function(err) {
        if (err) {
          res.send(err, 500);
          return;
        }

        if (req.params.format === 'html') {
          var partials = {layout:false, i : artwork.format.length - 1, format:format};

          res.contentType('text/html');
          res.render('admin/artwork-format.jade', partials);

          return;
        }

        res.contentType('application/json');
        res.send(JSON.stringify(this));
      });
    });

  });

  
  //delete format - partial ajax handler
  app.del('/admin/artwork/:artworkSlug/format/:formatId', function(req, res) {

    var Artwork = mongoose.model('Artwork');

    Artwork.findOne({slug : req.params.artworkSlug}, function(err, artwork) {
      if (err) {
        res.send(err, 500);
        return;
      }

      var fmt = artwork.format.id(req.params.formatId);

      if (!fmt) {
        res.send(JSON.stringify({result: 'error',
          error : 'could not find format with specified id' + req.params.formatId}));

        return;
      }

      fmt.remove();

      artwork.save(function(err) {
        if (err) {
          res.send(err, 500);
          return;
        }

        res.contentType('application/json');
        res.send(JSON.stringify({result: 'success'}));
      });

    });
  });

};

/* --- --- --- private helper methods --- --- --- */

function thenRender(template, model, res) {
  res.render(template, model);
}


function createArtwork(res, mongoose, image, next, artistSlug) {
  var Artwork = mongoose.model('Artwork'),
          Format = mongoose.model('Format'),
          newArtwork, newTitle, newSlug;

  ImageTools.createCopies(image, function(imageFiles) {
    newTitle = 'unpublished art : ' + new Date().getTime();

    var newFormat = new Format(
            {
              type :  "*unspecified*",
              detail : '*unspecified*',
              printsRun : 0,
              height : 0,
              width : 0,
              price : 999999,
              stock : 0
            });
    //TODO: figure out a way to add this as a Mongoose plugin.
    newFormat.hash = mongoose.utilities.getFormatHash(newFormat);

    newArtwork = new Artwork({
      title : newTitle,
      image : imageFiles,
      type : 'original',
      artist : artistSlug,
      description : 'A new piece of work',
      released : new Date(),
      format : []
    });

    newArtwork.format.push(newFormat);

    newArtwork.save(function(err) {
      if (err) {
        //throw err;
        res.send(err, 500);
      }

      next();
    });
  })
}
