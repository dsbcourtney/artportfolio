module.exports = function(app, mongoose, vdp){
	app.get('/product', function(req, res){
		var locals = {title : 'Test Product', pageTitle: 'Test Product'};
   vdp.getPublicViewData(thenRender, 'product.jade', locals, req, res);
	});
};

/* --- --- --- private helper methods --- --- --- */

function thenRender(template, model, res){
  res.render(template, model);
}