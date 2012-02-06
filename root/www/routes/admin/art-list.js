function artListAdminRoutes(app, mongoose, vdp) {

  //list all artwork
  app.get('/admin/artwork.:format?', function(req, res) {

    //Get an Artist Model instance
    var Artwork = mongoose.model('Artwork')
            , pageTitle = 'Art Rebellion : Artwork';

    var locals = {
      title : pageTitle ,
      pageTitle : pageTitle ,
      scripts : ['/js/admin/artwork-list.js']
    };

    //find all artists
    var artQuery = Artwork.find({});
    //artQuery.limit(20);
    
    //artQuery.limit(10);
    artQuery.exec(function(err, artworks) {
      if (err) {
        res.send(err, 500);
        return;
      }

      locals.artworks = artworks;

      vdp.getAdminViewData(thenRender, 'admin/artwork-list.jade', locals, req, res);
    });
  });

  //TODO : complete - 06/02/2012
  //partials
  app.post('/admin/artwork.:format?', function(req, res) {
    //find all artists
    var model = {};
    var artQuery = Artwork.find({});
  
    artQuery.where('artist', req.body.artist);
    artQuery.limit(req.body.limit);
    artQuery.skip(req.body.skip);
    
    //artQuery.limit(10);
    artQuery.exec(function(err, artworks) {
      if (err) {
        res.send(err, 500);
        return;
      }
  
      model.artworks = artworks;
  
    });
  });  
  
}

module.exports = artListAdminRoutes;

/* --- --- --- private helper methods --- --- --- */

function thenRender(template, model, res) {
  res.render(template, model);
}