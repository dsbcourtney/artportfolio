// Equivalent of include, this time including the express framework
var express = require('express');

// Creating the http instance
var app = express.createServer();

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
app.use(express.bodyParser());

// When the root path / in the url is called run the template file root.jade
app.get('/', function(req, res){
    res.render('root.jade');
});

// Upload path when this is entered run the upload.jade template
app.get('/upload/', function(req, res){
    res.render('upload.jade', {fileName:null});
});

// On post do something with the data
app.post('/upload/', function(req, res){
    var imgName = req.param('imageFile', null);
    res.render('upload.jade', {fileName:imgName});
    //upload_file(req, res);
});

app.listen(4000);