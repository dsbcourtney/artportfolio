var ArtworkViewModelProvider = require('../models/ArtworkViewModelProvider');

// http://nyteshade.posterous.com/posting-files-with-node-and-expressjs
module.exports = function(app, mongoose, vdp) {

  //view artwork
  app.get('/artwork/:artistSlug/:artworkSlug', function(req, res) {
    var locals = {title : 'Art Rebellion: [Artwork]', 
      artSlug : req.params.artworkSlug,
      artistSlug : req.params.artistSlug};

    ArtworkViewModelProvider.buildModel(mongoose, locals, function getViewDataAndRender(updatedModel){
      vdp.getPublicViewData(thenRender, 'artwork.jade', updatedModel, req, res);        
    });
    
  });

};

/* --- --- --- private helper methods --- --- --- */

function thenRender(template, model, res) {
  res.render(template, model);
}