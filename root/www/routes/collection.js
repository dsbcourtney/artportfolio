module.exports = function(app, mongoose) {

    app.get('/collection/:artistName/:collectionName', function(req, res) {
        res.render('collection.jade', {title : 'Art Rebellion', pageTitle: '[Collection Title]'});
    });

};