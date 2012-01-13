module.exports = function(app, mongoose) {

<<<<<<< HEAD
<<<<<<< HEAD
    app.get('/collection/:artistName/:collectionName', function(req, res) {
        res.render('collection.jade', {title : 'Art Rebellion', pageTitle: '[Collection Title]'});
    });
=======
module.exports = function(app, mongoose) {
>>>>>>> lewis_working
=======
module.exports = function(app, mongoose) {

  app.get('/collection/:artistName/:collectionName', function(req, res) {
    res.render('collection.jade', {title : 'Art Rebellion', pageTitle: '[Collection Title]'});
  });
>>>>>>> lewis_working

};
