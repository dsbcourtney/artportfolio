
module.exports = function(app){

  app.get('/artist/:artistName', function(req, res){
   res.render('artist.jade', {title : 'Art Rebellion: [Artist Name]', pageTitle: '[Artist Name]'});
  });
  
};
