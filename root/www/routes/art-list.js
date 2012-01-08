
module.exports = function(app){
  
  app.get('/art-list', function(req, res){
     res.render('tagged-artwork.jade', {title : 'Art Rebellion', pageTitle: '[All Art]'});
  });
  
  app.get('/art-list/:tag', function(req, res){
     res.render('tagged-artwork.jade', {title : 'Art Rebellion', pageTitle: '[Tag]'});
  }); 
  
    
};
