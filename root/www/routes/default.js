module.exports = function(app, mongoose, vdp){
  
  app.get('/', function(req, res){
    var locals = {title : 'Art Rebellion', pageTitle: 'The Gallery'};
    vdp.getPublicViewData(thenRender, 'index.jade', locals, res);
  });  
  
};

/* --- --- --- private helper methods --- --- --- */

function thenRender(template, model, res){
  res.render(template, model);
}
