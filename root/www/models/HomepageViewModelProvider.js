
//TODO : Add some sort of globals for all the strings lying around
var HomepageViewModelProvider = {

  buildModel : function (mongoose, model, next) {
    var Artwork = mongoose.model('Artwork');

    Artwork.find({status : 'published', featured : true}, function(err, featuredArt) {
      if (err) {
        throw err;
      }

      model.featuredArtwork = featuredArt;

      if (next) {
        next(model);
      }
    });
  }
};

module.exports = HomepageViewModelProvider;

