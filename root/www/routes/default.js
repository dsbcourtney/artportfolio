var viewData = require('../models/viewData');

module.exports = function(app, mongoose){
  
  app.get('/', function(req, res){
     res.render('index.jade', viewData.isPublic({title : 'Art Rebellion', pageTitle: 'The Gallery'}));
  });  
  
};
