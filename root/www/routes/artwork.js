// http://nyteshade.posterous.com/posting-files-with-node-and-expressjs
module.exports = function(app, mongoose){

    app.get('/artwork/:artistName/:collectionName/:artworkTitle', function(req, res){
        res.render('artwork.jade', {title : 'Art Rebellion: [Artwork]', pageTitle: '[Artwork]'});
    });

    /*
     --- --- ---
     ADMIN
     REST compliant interface

     */
    app.get('/admin/artwork/new', function(req, res){
        res.render('admin/artwork-form.jade', {title : 'Art Rebellion: [Artwork]', pageTitle: '[Artwork]'});
    });

    app.post('/admin/artwork', function(req, res){
        //res.render('artwork.jade', {title : 'Art Rebellion: [Artwork]', pageTitle: '[Artwork]'});
        //console.dir(req.body);
        console.dir(req.files.upload);
        res.send('ok');
    });
};