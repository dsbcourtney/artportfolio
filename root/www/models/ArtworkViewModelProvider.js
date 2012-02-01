//TODO : Add some sort of globals for all the strings lying around
var ArtworkViewModelProvider = {
  
  buildModel : function (mongoose, model, next) {
    var Artwork = mongoose.model('Artwork'),
        Artist = mongoose.model('Artist');

    Artwork.findOne({slug : model.artSlug, status : 'published'}, function(err, artwork){
      if(err){
        throw err;
      }
      
      model.artwork = artwork;
      model.pageTitle = artwork.title;
      
      thenFindArtist();
    });
    
    function thenFindArtist(){
      Artist.findOne({slug : model.artistSlug, status : 'published'}, function(err, artist){
        if(err){
          throw err;
        }
        
        model.artist = artist;
        
        next(model);
      });      
    }
    
    
  }
};

module.exports = ArtworkViewModelProvider;