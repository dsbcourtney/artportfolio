
var viewData = require('../models/viewData');

module.exports = function(app, mongoose){
  
  app.get('/art-list', function(req, res){
     res.render('tagged-artwork.jade', viewData.isPublic({title : 'Art Rebellion', pageTitle: '[All Art]'}));
  });

  
  app.get('/art-list/:tag', function(req, res){
     res.render('tagged-artwork.jade', viewData.isPublic({title : 'Art Rebellion', pageTitle: '[Tag]'}));
  }); 
  
    
};
