
module.exports = function(app){
  
  app.get('/artwork/:artistName/:collectionName/:artworkTitle', function(req, res){
     res.render('artwork.jade', {title : 'Art Rebellion: [Artwork]', pageTitle: '[Artwork]'});
  });
  
  
};