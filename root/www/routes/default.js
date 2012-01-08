
module.exports = function(app, mongoose){
  
  app.get('/', function(req, res){
     res.render('index.jade', {title : 'Art Rebellion', pageTitle: 'The Gallery'});
  });  
  
};
