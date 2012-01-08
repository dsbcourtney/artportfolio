var express = require("./node_modules/express/lib/express.js"),
        app = express.createServer();

// config
app.set('views', __dirname + '/views');
app.set('view options', { pretty: true });
app.set('view engine', 'jade');


// middleware
app.configure(function(){
//  app.use(express.logger('dev'));
//  app.use(express.bodyParser());
//  app.use(express.methodOverride());
//  app.use(express.cookieParser('keyboard cat'));
//  app.use(express.session());
//  app.use(require('./middleware/locals'));
//  app.use(messages());
  app.use(app.router);
  app.use(express.static(__dirname + '/static'));
  app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});


//app.get('/all-artwork', function(req, res){
//   res.render('index.jade', {title : 'Art Rebellion', pageTitle: 'The Gallery'});
//});






app.get('/', function(req, res){
   res.render('index.jade', {title : 'Art Rebellion', pageTitle: 'The Gallery'});
});

require('./routes/artist')(app);
require('./routes/collection')(app);
require('./routes/artwork')(app);
require('./routes/art-list')(app);

//
app.listen(3000);
console.log('Art Rebellion site started on port 3000');