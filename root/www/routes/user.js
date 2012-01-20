module.exports = function(app, mongoose) {

  app.post('/user/login', function(req, res) {

    var User = mongoose.model('User'),
      pageTitle = 'Art Rebellion : Users';

    res.render('login.jade', {title : pageTitle, pageTitle: pageTitle});

  });

  app.post('/user/register', function(req, res) {
    /* VALIDATION */
    console.log(req.body);

    //Get an User Model instance
    var User = mongoose.model('User');
       newUser = new User(req.body.user),
       pageTitle = 'Art Rebellion : Users';

    newUser.save(function(err) {
      if (err) {
        res.send(err, 500);
      }
    });

    res.render('register.jade', {title:pageTitle, pageTitle:pageTitle});

  });

};