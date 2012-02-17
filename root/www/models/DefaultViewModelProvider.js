//TODO : Add some sort of globals for all the strings lying around
var DefaultViewModelProvider = {

  buildModel:function (mongoose, model, next) {
    var Artist = mongoose.model('Artist');

    Artist.find({status:'published'})
            .populate('keyArtwork')
            .run(function (err, featuredArtists) {
              if (err) {
                throw err;
              }
              
              model.featuredArtists = featuredArtists;
              
              next(model);
            });
  }
};

module.exports = DefaultViewModelProvider;


/*

 private helper methods 

 */


