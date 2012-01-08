
module.exports = function(app){
  
  app.get('/', function(req, res){
     res.render('index.jade', {title : 'Art Rebellion', pageTitle: 'The Gallery'});
  });  
  
};
