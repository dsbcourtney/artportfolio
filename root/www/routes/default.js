var DefaultViewModelProvider = require('../models/DefaultViewModelProvider.js');

module.exports = function(app, mongoose, vdp){
  
  app.get('/', function(req, res){
    var model = {title : 'Art Rebellion Home'};
    var view = 'index.jade';
    
    DefaultViewModelProvider.buildModel(mongoose, model, function(updatedModel){
      
      //TODO: find out why this is being hit twice
      //console.log(model);
      
      vdp.getPublicViewData(thenRender, view, updatedModel, req, res);
      
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
