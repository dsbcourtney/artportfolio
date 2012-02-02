var ArtistViewModelProvider = require('../models/ArtistViewModelProvider.js');

module.exports = function(app, mongoose, vdp) {

  //TODO - some validation on the request data?
  app.get('/artists.:format?', function(req, res) {

    //Get an Artist Model instance
    var Artist = mongoose.model('Artist'),
            pageTitle = 'Art Rebellion : Artists';

    //find all artists
    Artist.find({}, function(err, artists) {
      if (err) {
        res.send(err, 500);
      }

      vdp.getAdminViewData(thenRender, 'artists.jade', locals, req, res);
    });
  });

  app.get('/artists/:artistSlug.:format?', function(req, res) {
    var model = {};
    model.artistSlug = req.params.artistSlug;

    ArtistViewModelProvider.buildModel(mongoose, model, function(updatedModel) {
      vdp.getPublicViewData(thenRender, 'artist.jade', updatedModel, req, res);
    });
  });

};


/* --- --- --- private helper methods --- --- --- */

function thenRender(template, model, res) {
  res.render(template, model);
}
