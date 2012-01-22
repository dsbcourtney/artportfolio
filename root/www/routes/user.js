module.exports = function(app, mongoose) {

    app.post('/user/login', function(req, res) {
        var User = mongoose.model('User'),
            pageTitle = 'Art Rebellion : Users',
            message = '';

        User.findOne({'email':req.body.user.email,'pass':req.body.user.pass}, function(err, user){
            if (err || !user){
                message = 'Sorry your log in details seem to incorrect, please try again.';
            } else { // Found so store some session stuff
                message = 'Log in successful, please wait whilst we redirect you back to the page you were on.';
                req.session.user = user;
                //user.lastLogin = Date.now();
                //user.loggedIn = TRUE;
                user.save(function(err){
                   if (err){
                       res.send(err, 500);
                   }
                });
            }
            res.render('login.jade', {title : pageTitle, pageTitle: pageTitle, message: message, user: user});
        });
    });

    app.get('/user/register', function(req, res){


    });

    app.post('/user/register', function(req, res) {

        var pageTitle = 'Art Rebellion : Users';
        var message = '';

        console.log(req.body.user);
        console.log(req.sessionID);
        //Get an User Model instance
        var User = mongoose.model('User');

        User.findOne({'email':req.body.user.email}, function(err, user) { // Check for existing user using email
            if (err || !user) {
                newUser = new User(req.body.user);
                newUser.save(function(err) { // Add the user
                    if (err) {
                        res.send(err, 500);
                    }
                });
                console.log('New registered user');
                message = 'Thank you for registering with us. You will shortly receive an email from us to confirm your identity after which you will be able to log in.';
            }
            else {
                console.log('Attempted registration');
                message = 'Sorry a user with that email address has already registered with us on the ' + user.dateAdded;
            }
            res.render('register.jade', {title:pageTitle, pageTitle:pageTitle, message:message});
        });

    });

};