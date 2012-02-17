function createViewData(mongoose) {

  return {

    // The rendering function for admin
    getAdminViewData:function (render, template, model, req, res) {

      getCommonViewData(model, mongoose, req, function (updatedModel) {

        updatedModel.viewType = "admin";
        updatedModel.layout = 'admin/adminlayout.jade';
        render(template, updatedModel, res);

      });


    },

    // The rendering function for public
    getPublicViewData:function (render, template, model, req, res) {

      getCommonViewData(model, mongoose, req, function (updatedModel) {

        updatedModel.viewType = "public";
        render(template, updatedModel, res);

      });
    }
  };

}


module.exports = function (mongoose) {

  return createViewData(mongoose);
};

/* --- --- private helper functions --- --- --- --- --- --- --- --- */

// This gets added to every view 
function getCommonViewData(model, mongoose, req, thenDo) {

  if (req.session) {
    model.visitor = req.session.visitor;
  }

  // Stuff required on every page - ie. headers, footers
  var Artist = mongoose.model('Artist');

  //FIND ALL ARTISTS
  Artist.find({}, function (err, artists) {
    if (err) {
      throw err;
    }

    model.artists = artists;

    thenDo(model);
  });
}
