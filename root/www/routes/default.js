module.exports = function(app, mongoose, vdp){
  
  app.get('/', function(req, res){
    var locals = {title : 'Art Rebellion', pageTitle: 'The Gallery'};
    vdp.getPublicViewData(thenRender, 'index.jade', locals, req, res);
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
