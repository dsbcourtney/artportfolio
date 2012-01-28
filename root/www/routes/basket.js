var cart = require('../models/Cart.js');

module.exports = function(app, mongoose, vdp){

	app.get('/cart', function(req, res) { // View Cart
		cart.checkout(req.session.id, mongoose);
		console.log(cart.noItems);
		var locals = {title : 'Shopping Cart', pageTitle: 'Shopping Cart', noItems: cart.noItems};
   vdp.getPublicViewData(thenRender, 'basket.jade', locals, req, res);
	});

	app.post('/cart', function(req, res) { // Add to Cart
		cart.add(req.session.id, req.body.product, mongoose);
		var noItems = cart.checkout(req.session.id, mongoose);
		var locals = {title : 'Shopping Cart', pageTitle: 'Shopping Cart', noItems: noItems};
   vdp.getPublicViewData(thenRender, 'basket.jade', locals, req, res);
	});

};

/* --- --- --- private helper methods --- --- --- */

function thenRender(template, model, res){
  res.render(template, model);
}