// Including the needed modules
var express = require('./node_modules/express/lib/express.js');
var form = require('./node_modules/connect-form/lib/connect-form.js');
var util = require('util');
var fs = require('fs');

// Creating the http instance
var app = express.createServer(
    form({keepExtensions: true})
);

app.configure(function(){
    //app.use(express.bodyParser()); // For some reason this stops the upload
    app.use(express.methodOverride());
});

// Sets some configuration development and production
// NODE_ENV sets which one is used
// Development throws exceptions to the browser
app.configure('development', function(){
    app.use(express.logger());
    app.use(express.errorHandler({
        dumpExceptions: true,
        showStack: true
    }));
});

app.configure('production', function(){
    app.use(express.logger());
    app.use(express.errorHandler());
});

// By using the app.set we can set some settings
// Express holds certain allowable settings
// http://expressjs.com/guide.html#settings
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');
app.set('view options', {layout:true});

// When the root path / in the url is called run the template file root.jade
app.get('/', function(req, res){
    res.render('root.jade');
});

// Upload path when this is entered run the upload.jade template
app.get('/upload/', function(req, res){
    res.render('upload.jade');
});

app.get('/uploaded/', function(req, res){
    res.render('uploaded.jade');
});

// On post do something with the data
app.post('/upload/', function(req, res, next){
    req.form.complete(function(err, fields, files) {
        ins = fs.createReadStream(files.photo.path);
        ous = fs.createWriteStream('./uploads/' + files.photo.filename);
        util.pump(ins, ous, function(err) {
            res.redirect('/uploaded/');
        });
        //console.log('\nUploaded %s to %s', files.photo.filename, files.photo.path);
        //res.send('Uploaded ' + files.photo.filename + ' to ' + files.photo.path);
    });
});

app.listen(4000);