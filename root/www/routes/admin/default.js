

function defaultAdminRoute(app, mongoose, vdp){
 
  app.get('/admin', function(req, res){
    var locals = {title : 'Art Rebellion : Administration dashboard', pageTitle: 'Administration dashboard'};
    vdp.getAdminViewData(thenRender, 'admin/dashboard.jade', locals, req, res);
  });    
  
}


module.exports = defaultAdminRoute;


/* --- --- --- private helper methods --- --- --- */

function thenRender(template, model, res){
  res.render(template, model);
}


