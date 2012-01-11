
module.exports = function(app, mongoose) {

    // Upload path when this is entered run the upload.jade template
    app.get('/admin/upload/', function(req, res){
        res.render('upload.jade');
    });

    // On post do something with the data
    app.post('/admin/upload/', function(req, res, next){

        req.form.complete(function(err, fields, files) {
            ins = fs.createReadStream(files.photo.path);
            ous = fs.createWriteStream('./artwork/' + files.photo.filename);
            util.pump(ins, ous, function(err) {
                res.redirect('/admin/uploaded/');
            });
            //console.log('\nUploaded %s to %s', files.photo.filename, files.photo.path);
            //res.send('Uploaded ' + files.photo.filename + ' to ' + files.photo.path);
        });
        res.render('upload.jade');
    });

}