//TODO : Add some sort of globals for all the strings lying around
var ArtistViewModelProvider = {

  buildModel : function (mongoose, model, next) {

    var Artist = mongoose.model('Artist');

    Artist.findOne({slug : model.artistSlug, status : 'published'}, function(err, artist) {

      if (err) {
        throw err;
      }

      model.title = 'Art Rebellion : ' + artist.name;
      model.pageTitle = model.title;
      model.artist = artist;

      thenGetArtForArtist();

    });

    function thenGetArtForArtist() {
      
      var Artwork = mongoose.model('Artwork');

      Artwork.find({artist : model.artist._id, status : 'published'}, function(err, artwork) {

        if (err) {
          throw err;
        }

        model.artwork = artwork;
        
        next(model);
      });
    }
  }
};


module.exports = ArtistViewModelProvider;
