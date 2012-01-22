function createViewData(mongoose) {

  return {

    // The rendering function for admin
    getAdminViewData : function(render, template, model, req, res) {

      getCommonViewData(model, mongoose, req, function(updatedModel) {

        updatedModel.viewType = "admin";
        render(template, updatedModel, res);

      });

    },

    // The rendering function for public
    getPublicViewData : function(render, template, model, req, res) {

      getCommonViewData(model, mongoose, req, function(updatedModel) {

        updatedModel.viewType = "public";
        render(template, updatedModel, res);

      });


    }

  };

}


module.exports = function(mongoose) {

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
  
  Artist.find({status : 'published'}, function(err, artists){
    
    model.publishedArtists = artists;
 
    thenDo(model);
  });
}