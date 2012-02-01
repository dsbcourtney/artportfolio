var HomepageViewModelProvider = require('../models/HomepageViewModelProvider.js');

module.exports = function(app, mongoose, vdp){
  
  app.get('/', function(req, res){
    var model = {title : 'Art Rebellion', pageTitle: 'The Gallery'};
    
    HomepageViewModelProvider.buildModel(mongoose, model, function(updatedModel){
    
      //TODO: could we just use the reference to model instead of passing through
      // the updated : updateModel param?
      vdp.getPublicViewData(thenRender, 'index.jade', updatedModel, req, res);
      
    });
  });  
  
  app.get('/admin', function(req, res){
    var locals = {title : 'Art Rebellion : Administration dashboard', pageTitle: 'Administration dashboard'};
    vdp.getAdminViewData(thenRender, 'admin/dashboard.jade', locals, req, res);
  });    
  
};

/* --- --- --- private helper methods --- --- --- */

function thenRender(template, model, res){
  res.render(template, model);
}
