const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/product-list',{ 'products': products, 'docTitle': 'Shop', 'path':'/products'})
  });
  // res.sendFile(path.join(rootDir,'views','shop.html'));
}

exports.getProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.findById(productId, product => {
    res.render('shop/product-detail',{ 'product': product, 'docTitle': 'Shop', 'path':'/products'})
  });
}

exports.getIndex = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('shop/index',{ 'products': products, 'docTitle': 'Shop', 'path':'/'})
  });
}

exports.getCart = (req, res, next) => {
  Cart.getCartProducts(cart =>{
    Product.fetchAll(products =>{
      const cartProducts = []; 
      for(product of products){
        const cartProductData = cart.products.find(prod => prod.id === product.id) 
        if(cartProductData){
          cartProducts.push({product: product, qty: cartProductData.qty })
        }
      }
      res.render('shop/cart',{'docTitle': 'Shop', 'path':'/cart', products: cartProducts});
    });
  });
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId,(product)=>{
    Cart.addProduct(product.id, product.price);
    res.redirect('/cart')
  });
  // res.render('shop/cart',{'docTitle': 'Shop', 'path':'/cart'})
}

exports.postCartDeleteCartItem = (req, res, next) => {
  const productId = req.body.productId;
  Product.findById(productId,(product)=>{
    Cart.deleteProduct(productId, product.price);
    res.redirect('/cart')
  });
  
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders',{'docTitle': 'Your orders', 'path':'/orders'})
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout',{'docTitle': 'Shop', 'path':'/checkout'})
}