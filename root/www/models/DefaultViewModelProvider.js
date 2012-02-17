//TODO : Add some sort of globals for all the strings lying around
var DefaultViewModelProvider = {

  buildModel:function (mongoose, model, next) {
    var Artist = mongoose.model('Artist');

    Artist.find({status:'published', featured:true})
            .populate('keyArtwork')
            .run(function (err, featuredArtists) {
              if (err) {
                throw err;
              }

              console.log(featuredArtists);
              
              model.featuredArtists = featuredArtists;
              
              next(model);
            });
  }
};

module.exports = DefaultViewModelProvider;


/*

 private helper methods 

 */

//function addImagesForKeyArtwork(mongoose, model, onComplete) {
//  
//  var Artwork = mongoose.model('Artwork');
//
//  for(var i = 0; i < model.featured.length; i++){
//    
//    (function(ii){
//
//      console.log(ii);      
//      Artwork.findOne({slug: model.featured[ii].artist.keyArtwork}, function(err, artwork){
//        
//        if(err){
//          throw err;
//        }
//        
//        //TODO: got to figure out a better way of doing this - it's not efficient.
//        model.featured[ii].artwork = artwork;
//        
//        if(ii == model.featured.length -1){
//          onComplete(model);
//        }
//      })      
//      
//    })(i);
//  }
//}

