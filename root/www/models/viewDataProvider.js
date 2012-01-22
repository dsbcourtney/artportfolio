function createViewData(mongoose) {

  return {

    // The rendering function for admin
    getAdminViewData : function(render, template, model, res) {

      getCommonAttributes(model, mongoose, function(updatedModel) {

        updatedModel.viewType = "admin";

        render(template, updatedModel, res);

      });

    },

    // The rendering function for public
    getPublicViewData : function(render, template, model, res) {

      getCommonAttributes(model, mongoose, function(updatedModel) {

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

function getCommonAttributes(model, mongoose, thenDo) {

  // Stuff required on every page - ie. headers, footers

  var Artist = mongoose.model('Artist');

  Artist.find({}, function(err, artists) {

    if (err) {
      throw err;
    }

    model.artists = artists;

    
    Artist.find({status : 'published'}, function(err, publishedArtists) {

      if (err) {
        throw err;
      }

      model.publishedArtists = publishedArtists;

      console.log(model);
      
      
      thenDo(model);
    });

  });


}