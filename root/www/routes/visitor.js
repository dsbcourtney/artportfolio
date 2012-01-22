module.exports = function(app, mongoose, vdp) {

    app.post('/visitor/login', function(req, res) {
        var Visitor = mongoose.model('Visitor'),
            pageTitle = 'Art Rebellion : Visitor',
            message = '';

        Visitor.findOne({'email':req.body.visitor.email,'pass':req.body.visitor.pass}, function(err, visitor){
            if (err || !visitor){
                message = 'Sorry your log in details seem to incorrect, please try again.';
            } else { // Found so store some session stuff
                message = 'Log in successful, please wait whilst we redirect you back to the page you were on.';
              
                req.session.visitor = visitor;
              
                visitor.dateLoggedIn = Date.now();
                visitor.loggedIn = true;
                visitor.save(function(err){
                   if (err){
                       res.send(err, 500);
                   }
                });
            }
            var locals = {title : pageTitle, pageTitle: pageTitle, message: message};
            vdp.getPublicViewData(thenRender, 'login.jade', locals, req, res);
        });
    });

    app.get('/visitor/register', function(req, res){


    });

    app.get('/visitor/logout', function(req, res){
        var Visitor = mongoose.model('Visitor'),
            pageTitle = 'Art Rebellion : Visitor',
            message = '';
        var locals = {title:pageTitle, pageTitle:pageTitle, message:message};

        console.log(req.session.visitor.email);

        Visitor.findOne({'email':req.session.visitor.email}, function(err, visitor){
           if (err || !visitor) {

           } else {
               visitor.loggedIn = false;
               visitor.save(function(err){
                   if (err){
                       res.send(err, 500);
                   }
               });
               delete req.session.visitor;
               vdp.getPublicViewData(thenRender, 'logout.jade', locals, req, res);
           }
        });

    });

    app.post('/visitor/register', function(req, res) {

        var pageTitle = 'Art Rebellion : Users';
        var message = '';

        console.log(req.body.visitor);
        console.log(req.sessionID);
        //Get an User Model instance
        var Visitor = mongoose.model('Visitor');

        Visitor.findOne({'email':req.body.visitor.email}, function(err, visitor) { // Check for existing user using email
            if (err || !visitor) {
                newVisitor = new Visitor(req.body.visitor);
                newVisitor.save(function(err) { // Add the visitor
                    if (err) {
                        res.send(err, 500);
                    }
                });
                console.log('New registered visitor');
                message = 'Thank you for registering with us. You will shortly receive an email from us to confirm your identity after which you will be able to log in.';
            }
            else {
                console.log('Attempted registration');
                message = 'Sorry a user with that email address has already registered with us on the ' + user.dateAdded;
            }
            var locals = {title:pageTitle, pageTitle:pageTitle, message:message};
            vdp.getPublicViewData(thenRender, 'register.jade', locals, res);
        });

    });

};

function thenRender(template, model, res){
    res.render(template, model);
}


