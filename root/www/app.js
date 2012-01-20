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
//  app.use(express.cookieParser('load of cobblers'));
//  app.use(express.session());
//  app.use(require('./middleware/locals'));
//  app.use(messages());
  app.use(app.router);
  app.use(express.static(__dirname + '/static'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


//routes
//site
require('./routes/default')(app, arMongoose, viewDataProvider);
require('./routes/artist')(app, arMongoose, viewDataProvider);
require('./routes/artwork')(app, arMongoose, viewDataProvider);
require('./routes/art-list')(app, arMongoose, viewDataProvider);

//
app.listen(3000);
console.log('Art Rebellion site started on port 3000');