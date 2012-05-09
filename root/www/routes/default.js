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

  app.get('/favicon.ico', function(req, res) {
    
  });
  
  app.get('/gallery/:viewname', function(req, res) {
      var model = {title : 'Art Rebellion'};
  
      vdp.getPublicViewData(thenRender, req.params.viewname + '.jade', model, req, res);        
    });
  
  
//  app.get('/contact', function(req, res) {
//    var model = {title : 'Art Rebellion: Contact Us'};
//
//    vdp.getPublicViewData(thenRender, 'contact.jade', model, req, res);        
//  });
//  
//  app.get('/about', function(req, res) {
//     var model = {title : 'Art Rebellion: About Us'};
// 
//     vdp.getPublicViewData(thenRender, 'about.jade', model, req, res);        
//     
//   });  
  
  
};

/* --- --- --- private helper methods --- --- --- */

function thenRender(template, model, res){
  res.render(template, model);
}
