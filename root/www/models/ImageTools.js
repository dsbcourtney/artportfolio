        
var im = require('imagemagick'),
    path = require('path'),    
    imagesDir = path.resolve(__dirname, '../public/img/artwork');//'/Users/lewis/github/artportfolio/root/www/public/img/artwork';//TODO : change to environment var

im.identify.path = "/usr/local/bin/identify"; 
im.convert.path = "/usr/local/bin/convert";

//  https://github.com/rsms/node-imagemagick
var ImageTools = {
  createCopies : function(file, onFinish, destPathIn, sizesIn) {
    var sizes = sizesIn || [200, 500, 800, 1024],
            destPath = destPathIn || imagesDir,
            imageFiles = {}, currentSize, counter = 1;

    if (fileIsImage(file)) {
      for (var i = 0; i < sizes.length; i++) {
        currentSize = sizes[i];

        if (isNaN(sizes[i]) && parseInt(sizes[i]) > 0) {
          throw 'size element' + i + ' is not a recognised positive integer';
        }

        resizeImageAndSave(file, destPath, currentSize, function(opts, filename) {
          imageFiles[opts] = filename;
          
          if(counter == sizes.length){
            onFinish(imageFiles);
          }
          counter++;
        });
      }
    }
    else {
      throw "file is not a recognised image : " + file.type;
    }
  }
};


module.exports = ImageTools;

/* --- ---  private functions   --- ---  --- ---  --- ---  --- ---  --- ---  --- ---  --- ---  --- ---  --- --- 
 * 
 * */

// checks file is a recognised image mime type
function fileIsImage(file) {
  var acceptedMimes = ['image/jpeg', 'image/pjpeg', 'image/png'];

  return acceptedMimes.indexOf(file.type) > -1;
}

//
function resizeImageAndSave(file, destPath, maxLargeDimension, next) {
  var max = maxLargeDimension,
          newFileName = getImageFileName(file, maxLargeDimension),
          imgOptions = {
            srcPath: file.path,
            dstPath: destPath + '/' + newFileName
          };

  //resize image based for orientation
  getImageOritentation(file, function(isLandscape) {
    if (isLandscape) {
      imgOptions.width = maxLargeDimension
    } else {
      imgOptions.height = maxLargeDimension
    }

    im.resize(imgOptions
            , function(err, stdout, stderr) {
              if (err){
                throw err
              }

              next('max'+maxLargeDimension+'px', newFileName);
            });
  });
}

//
function getImageOritentation(file, next) {
  
  path.exists(file.path, function(exists){
    
    if(!exists){
      throw 'path does not exist : ' + file.path;
    }
    
    im.identify(file.path, function(err, features) {
      if (err) {
        throw err
      }
      counter++;
      next(features.width >= features.height);
    });

  });
  
  

}

//
function getImageFileName(file, size) {
  var dotIndex = file.name.lastIndexOf('.'),
          name = file.name.substr(0, dotIndex),
          extension = file.name.substr(dotIndex, file.name.length - dotIndex);

  return name + '-' + size + 'px' + extension;
}

var counter = 0;


