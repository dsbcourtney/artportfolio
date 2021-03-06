var im = require('imagemagick'),
        ImageTools = require('../../models/ImageTools.js');

function artworkAdminRoutes(app, mongoose, vdp) {
  /* ---Admin Routes --- --- */

  //upload artwork image form
  app.get('/admin/artwork/new.:format?', function (req, res) {
    var locals = {title:'Art Rebellion: Add artwork images', pageTitle:'Add artwork images'};

    vdp.getAdminViewData(thenRender, 'admin/artwork-image-form.jade', locals, req, res);
  });


  //upload artwork handler
  app.post('/admin/artwork.:format?', function (req, res) {
 
    var counter = 1;

    if (req.files.artImages[0] && req.files.artImages[0].type) {
      for (var i = 0; i < req.files.artImages.length; i++) {

        //TODO: sort our async issues 
        createArtwork(res, mongoose, req.files.artImages[i], function () {
          if (counter == req.files.artImages.length) {
            res.redirect('/admin/artwork');
          }

          counter++;
        }, req.body.artist);
      }
    }
    else {
      createArtwork(res, mongoose, req.files.artImages, function () {
        res.redirect('/admin/artwork');
      }, req.body.artist);
    }
  });


  //update artwork form
  app.get('/admin/artwork/:artworkSlug', function (req, res) {
    var Artwork = mongoose.model('Artwork')
            , pageTitle
            , locals = {  method:"POST",
      methodOverride:"PUT",
      scripts:['/js/admin/artwork-details-form.js']};

    Artwork.findOne({slug:req.params.artworkSlug}, function (err, artwork) {

      locals.visitor = req.session.visitor;

      locals.artwork = artwork;
      locals.formAction = "/admin/artwork/" + artwork.slug;
      locals.title = "Art Rebellion : Edit Artwork : " + artwork.title;
      locals.pageTitle = locals.title;

      vdp.getAdminViewData(thenRender, 'admin/artwork-details-form.jade', locals, req, res);

    });

  });


  //update artwork handler
  app.put('/admin/artwork/:artworkSlug', function (req, res) {

    var Artwork = mongoose.model('Artwork'),
            Artist = mongoose.model('Artist'),
            pageTitle;

    //create a new slug if needed.
    req.body.artwork.slug = mongoose.utilities.getSlug(req.body.artwork.title);
    req.body.artwork.tag = req.body.artwork.tag.split(',');
    req.body.artwork.featured = (req.body.artwork.featured == "on");

    //fix tags - trim etc
    for (var i = req.body.artwork.tag.length - 1; i >= 0; i--) {
      req.body.artwork.tag[i] = req.body.artwork.tag[i].trim().toLowerCase();
      //if(typeof req.body.artwork.tag[i] == 'string' && req.body.artwork.tag[i] === ''){
      if (!req.body.artwork.tag[i]) {
        req.body.artwork.tag.splice(i, 1);
      }
    }

    //mongoose.utilities.getFormatHash
    //TODO: figure out a way to add this as a Mongoose plugin.
    for (var i = 0; i < req.body.artwork.format.length; i++) {
      req.body.artwork.format[i].hash = mongoose.utilities.getFormatHash(req.body.artwork.format[i]);
    }

    Artwork.update({slug:req.params.artworkSlug}, req.body.artwork, {multi:false, upsert:false}, function (err) {

      if (err) {
        res.send(err, 500);
        return;
      }

      res.redirect('/admin/artwork');

    });
    
  });

  /* --- --- --- partials / ajax handlers --- --- --- */
  app.del('/admin/artwork/:artworkSlug', function (req, res) {

    var Artwork = mongoose.model('Artwork');

    Artwork.remove({slug:req.params.artworkSlug}, function (err) {
      var result = {};

      if (err) {
        result = {result:'error', error:err};
      } else {
        result = {result:'success'};
      }
      res.send(result);
      result = null;
    })
  });


  //add new format - partial ajax handler
  app.post('/admin/artwork/:artworkSlug/format/new.:format', function (req, res) {
    var Artwork = mongoose.model('Artwork'),
            Format = mongoose.model('Format');

    Artwork.findOne({slug:req.params.artworkSlug}, function (err, artwork) {
      if (err) {
        res.send(err, 500);
        return;
      }

      var format = new Format(
              {
                type:"*unspecified*",
                detail:'*unspecified*',
                printsRun:0,
                height:0,
                width:0,
                price:999999.99,
                stock:0
              });

      artwork.format.push(format);

      artwork.save(function (err) {
        if (err) {
          res.send(err, 500);
          return;
        }

        if (req.params.format === 'html') {
          var partials = {layout:false, i:artwork.format.length - 1, format:format};

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
  app.del('/admin/artwork/:artworkSlug/format/:formatId', function (req, res) {

    var Artwork = mongoose.model('Artwork');

    Artwork.findOne({slug:req.params.artworkSlug}, function (err, artwork) {
      if (err) {
        res.send(err, 500);
        return;
      }

      var fmt = artwork.format.id(req.params.formatId);

      if (!fmt) {
        res.send(JSON.stringify({result:'error',
          error:'could not find format with specified id' + req.params.formatId}));

        return;
      }

      fmt.remove();

      artwork.save(function (err) {
        if (err) {
          res.send(err, 500);
          return;
        }

        res.contentType('application/json');
        res.send(JSON.stringify({result:'success'}));
      });

    });
  });

}


module.exports = artworkAdminRoutes;


/* --- --- --- private helper methods --- --- --- */

function thenRender(template, model, res) {
  res.render(template, model);
}


function createArtwork(res, mongoose, image, next, artist_id) {
  var Artwork = mongoose.model('Artwork'),
          Format = mongoose.model('Format'),
          newArtwork, newTitle, newSlug;

  ImageTools.createCopies(image, function (imageFiles) {
    newTitle = 'unpublished art : ' + new Date().getTime();

    var newFormat = new Format(
            {
              type:"*unspecified*",
              detail:'*unspecified*',
              printsRun:0,
              height:0,
              width:0,
              price:999999,
              stock:0
            });
    //TODO: figure out a way to add this as a Mongoose plugin.
    newFormat.hash = mongoose.utilities.getFormatHash(newFormat);

    newArtwork = new Artwork({
      title:newTitle,
      image:imageFiles,
      type:'original',
      description:'A new piece of work',
      released:new Date(),
      format:[]
    });
    
    if(artist_id){
      newArtwork.artist = artist_id;
    }

    newArtwork.format.push(newFormat);

    newArtwork.save(function (err) {
      if (err) {
        throw err;
        //res.send(err, 500);
      }

      next();
    });
  })
}
