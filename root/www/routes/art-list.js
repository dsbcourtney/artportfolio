var ArtListViewModelProvider = require('../models/ArtListViewModelProvider.js');

module.exports = function(app, mongoose, vdp) {

  app.get('/art-list', function(req, res) {
    var locals = {title : 'Art Rebellion', pageTitle: '[All Art]'};

    vdp.getPublicViewData(thenRender, 'tagged-artwork.jade', locals, req, res);
  });


  app.get('/art-list/:tag', function(req, res) {
    var model = {title : 'Art Rebellion', pageTitle: '[Tag]'};

    model.query = req.params.tag;

    ArtListViewModelProvider.buildModel(mongoose, model, function(updatedModel) {
      
      updatedModel.title = 'Art Rebellion : art tagged with ' + updatedModel.query;
      updatedModel.pageTitle = updatedModel.title;
      
      vdp.getPublicViewData(thenRender, 'tagged-artwork.jade', updatedModel, req, res);
    })
  });
};

/* --- --- --- private helper methods --- --- --- */

function thenRender(template, model, res) {
  res.render(template, model);
}

