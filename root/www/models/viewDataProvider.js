function createViewData(mongoose) {

  return {

    getAdminViewData : function(render, template, model, res) {

      getCommonAttributes(model, mongoose, function(updatedModel) {

        updatedModel.viewType = "admin";

        render(template, updatedModel, res);

      });

    },

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

  var Artist = mongoose.model('Artist');
  
  Artist.find({status : 'published'}, function(err, artists){
    
    model.publishedArtists = artists;
 
    thenDo(model);
  });
}