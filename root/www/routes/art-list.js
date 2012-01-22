
module.exports = function(app, mongoose, vdp) {

  app.get('/art-list', function(req, res) {
    var locals = {title : 'Art Rebellion', pageTitle: '[All Art]'};

    vdp.getPublicViewData(thenRender, 'tagged-artwork.jade', locals, req, res);
  });


  app.get('/art-list/:tag', function(req, res) {
    var locals = {title : 'Art Rebellion', pageTitle: '[Tag]'};

    vdp.getPublicViewData(thenRender, 'tagged-artwork.jade', locals, req, res);

  });
};

/* --- --- --- private helper methods --- --- --- */

function thenRender(template, model, res){
  res.render(template, model);
}

