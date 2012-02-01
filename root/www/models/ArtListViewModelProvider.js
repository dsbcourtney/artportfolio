//TODO : Add some sort of globals for all the strings lying around
var ArtListViewModelProvider = {

  buildModel : function (mongoose, model, next) {
    
    var Artwork = mongoose.model('Artwork');
    
    Artwork.find({tag : model.query}, function(err, artwork){
      
      if(err){
        throw err;
      }
      
      model.artwork = artwork;
    
      next(model);  
    
    });
    
  }

};

module.exports = ArtListViewModelProvider;