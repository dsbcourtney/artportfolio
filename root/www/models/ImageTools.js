var im = require('imagemagick'),
        imagesDir = '/Users/lewis/github/artportfolio/root/www/public/img/artwork';//TODO : change to environment var

//  https://github.com/rsms/node-imagemagick
var ImageTools = {
  createCopies : function(file, onFinish, destPath, sizes) {
    var sizes = sizes || [200, 500, 800, 1024],
            destPath = destPath || imagesDir,
            imageFiles = {}, currentSize, counter = 1;

    if (fileIsImage(file)) {
      for (var i = 0; i < sizes.length; i++) {
        currentSize = sizes[i];

        if (isNaN(sizes[i]) && parseInt(sizes[i]) > 0) {
          throw 'size element' + i + ' is not a recognised positive integer';
        }

        resizeImageAndSave(file, destPath, currentSize, function(op, filename) {
          imageFiles[op] = filename;
          
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
              if (err) throw err

              next('max'+maxLargeDimension+'px', newFileName);
            });
  });
}

//
function getImageOritentation(file, next) {
  im.identify(file.path, function(err, features) {
    if (err) throw err

    next(features.width >= features.height);
  })
}

//
function getImageFileName(file, size) {
  var dotIndex = file.name.lastIndexOf('.'),
          name = file.name.substr(0, dotIndex),
          extension = file.name.substr(dotIndex, file.name.length - dotIndex);

  return name + '-' + size + 'px' + extension;
}



