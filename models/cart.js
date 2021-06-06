const fs = require('fs');
const path = require('path');

const p = path.join(
      path.dirname(require.main.filename),
      'data', 
      'cart.json'
    );

module.exports =  class Cart {
	constructor(){
		this.products =[];
		this.totalPrice = 0;
	}

	static addProduct(id, productPrice){
		// Fetch previos cart
		fs.readFile(p,"utf8",(err, data)=>{
			let cart = {products: [], totalPrice: 0};
      console.log(err);
      console.log(JSON.parse(data));
			if(!err){
				cart = JSON.parse(data);
			}			
			const existingProductIndex = cart.products.findIndex(product => product.id === id);
      const existingProducts = cart.products[existingProductIndex];
			let updateProduct;
			if(existingProducts){
				updateProduct = { ...existingProducts }
				updateProduct.qty = updateProduct.qty + 1;
        cart.products = [...cart.products]
        cart.products[existingProductIndex] = updateProduct;
			}else{
				updateProduct = { id: id, qty: 1}
        cart.products = [...cart.products, updateProduct]	
			}
			cart.totalPrice = cart.totalPrice + +productPrice;
      fs.writeFile(p,JSON.stringify(cart), (err)=>{
        console.log();
      });
		});
	}

  static deleteProduct(id, productPrice){
    fs.readFile(p,"utf8",(err, data) => {
      if(err){
        return;
      }
      const cart = JSON.parse(data);
      const updateCart = { ...cart };
      const product = updateCart.products.find(product => product.id === id);
      if(!product){
        return;
      }
      const productQty = product.qty;
      updateCart.products = updateCart.products.filter(product => product.id !== id);
      updateCart.totalPrice -= (+productPrice * productQty) ;
      fs.writeFile(p,JSON.stringify(updateCart), (err)=>{
        console.log("product deleted");
      });
    });
  }

  static getCartProducts(cb){
    fs.readFile(p,"utf8",(err, data) => {
      const cart = JSON.parse(data);
      if(err){
        cb(null)
      }else{
        cb(cart)
      }
    });
  }
}