var viewData = require('../models/viewData');

module.exports = function(app, mongoose) {

  app.get('/collection/:artistName/:collectionName', function(req, res) {
    res.render('collection.jade', viewData.isAPublic({title : 'Art Rebellion', pageTitle: '[Collection Title]'}));
  });

};
