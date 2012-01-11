var im = require('imagemagick'),
        imagesDir = '/Users/lewis/github/artportfolio/root/www/static/img/artwork';

//https://github.com/rsms/node-imagemagick

function getImageFileName(file, size) {
  var dotIndex = file.name.lastIndexOf('.'),
          name = file.name.substr(0, dotIndex),
          extension = file.name.substr(dotIndex, file.name.length - dotIndex);

  return name + '-' + size + 'px' + extension;
}

function getImageOritentation(file, next) {
  im.identify(file.path, function(err, features) {
    if (err) throw err

    next(features.width >= features.height)

    console.log(features);
    // { format: 'JPEG', width: 3904, height: 2622, depth: 8 }
  })
}

function resizeImageAndSave(file, maxLargeDimension) {
  var max = maxLargeDimension,
          imgOptions = {
            srcPath: file.path,
            dstPath: imagesDir + '/' + getImageFileName(file, maxLargeDimension)
          };

  getImageOritentation(file, function(isLandscape) {
    if(isLandscape){
      imgOptions.width = maxLargeDimension
    }else{
      imgOptions.height = maxLargeDimension
    }
    
    im.resize(imgOptions
            , function(err, stdout, stderr) {
              if (err) throw err

              console.log('resized ' + file.path + ' to ' + maxLargeDimension + 'px');
            });
  });
}

function fileIsImage(file) {
  var acceptedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];

  return acceptedMimes.indexOf(file.type) > -1;
}

function createImageSizes(file) {
  resizeImageAndSave(file, 200);
  resizeImageAndSave(file, 500);
  resizeImageAndSave(file, 800);
  resizeImageAndSave(file, 1024);
}

function createImageFiles(files, next) {
  var file;

  if (files._writeStream) {
    if (files.name && files.path && files.type) {
      if (fileIsImage(files)) {
        createImageSizes(files);
        next();
      } else {
        //delete file
      }
    }
    else {
      throw 'file not recognised when trying to create thumbnails';
    }
  }
  else {
    for (var i = 0; i < files.length; i++) {
      file = files[i];

      if (fileIsImage(file)) {
        createImageSizes(file);
      } else {
        //delete file
      }
    }
    next();
  }
}


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
    //res.render('artwork.jade', {title : 'Art Rebellion: [Artwork]', pageTitle: '[Artwork]'});
    //console.dir(req.body);
    console.dir(req.files);

    createImageFiles(req.files.artImages, function() {
      res.send('ok');
    })

  });
};