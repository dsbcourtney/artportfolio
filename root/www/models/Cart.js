var Cart = {
	noItems : 0,
	checkout: function(sessId, mongoose) { // Method
		console.log('Started checkout procedure');
		// Lets query the database and see if anything is in the basket currently
		var Basket = mongoose.model('Cart');
		Basket.count({'sessId':sessId}, function(err, count) {
			noItems = count;
		});
	},
	add: function(sessId, product, mongoose) {
		console.log('Add to cart');
		// Need to check if that product is already in the basket or not
		var Basket = mongoose.model('Cart');
		Basket.findOne({'sessId':sessId, 'prodId': product.prodId}, function(err, basket) {
			if (err || !basket) { // Nothing found so insert
				newItem = new Basket();
				newItem.sessId = sessId;
				newItem.prodId = product.prodId;
				newItem.prodName = product.prodName;
				newItem.prodPrice = product.prodPrice;
				newItem.quantity = product.quantity;
				newItem.save(); // Add the item
				console.log(sessId);
			} else { // A row has been found so get the quantity and add it to the cart

			}
		}); 
	}
}

module.exports = Cart;