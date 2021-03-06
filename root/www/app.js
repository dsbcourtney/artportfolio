var express = require('./node_modules/express/lib/express.js')
        , app = express.createServer()
        , arMongoose = require('./models/Schema.js')
        , viewDataProvider = require('./models/viewDataProvider')(arMongoose);

arMongoose.connect('mongodb://localhost:27017/artrebellion');

// config
app.set('views', __dirname + '/views');
app.set('view options', { pretty: true });
app.set('view engine', 'jade');


// middleware
app.configure(function() {
//  app.use(express.logger('dev'));
    app.use(express.bodyParser({
        uploadDir: __dirname + '/uploads',
        keepExtensions: true
    }));
    app.use(express.methodOverride());
    app.use(express.cookieParser());
    app.use(express.session({ secret: "foobar"}));
//  app.use(require('./middleware/locals'));
//  app.use(messages());
    app.use(app.router);
    app.use(express.static(__dirname + '/public'));
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));

});

//admin routes
require('./routes/admin/default')(app, arMongoose, viewDataProvider);
require('./routes/admin/artist')(app, arMongoose, viewDataProvider);
require('./routes/admin/art-list')(app, arMongoose, viewDataProvider);

require('./routes/admin/artwork')(app, arMongoose, viewDataProvider);


//public routes
require('./routes/default')(app, arMongoose, viewDataProvider);
require('./routes/artist')(app, arMongoose, viewDataProvider);
require('./routes/artwork')(app, arMongoose, viewDataProvider);
require('./routes/art-list')(app, arMongoose, viewDataProvider);
require('./routes/visitor.js')(app, arMongoose, viewDataProvider);
require('./routes/basket.js')(app, arMongoose, viewDataProvider);

require('./routes/product.js')(app, arMongoose, viewDataProvider);

//
app.listen(3000);
console.log('Art Rebellion site started on port 3000');