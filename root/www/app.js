// Including the needed modules
var express = require('./node_modules/express/lib/express.js'),
    form = require('./node_modules/connect-form/lib/connect-form.js'),
    arMongoose = require('./models/Schema.js'),
    util = require('util'),
    fs = require('fs');

arMongoose.connect('mongodb://localhost:27017/artrebellion');

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

//require('./routes/default')(app, arMongoose);
//require('./routes/artist')(app, arMongoose);
//require('./routes/collection')(app, arMongoose);
//require('./routes/artwork')(app, arMongoose);
//require('./routes/art-list')(app, arMongoose);
require('./routes/admin-upload')(app, arMongoose);

// Get Node to listen on the requested Port no.
app.listen(4000);