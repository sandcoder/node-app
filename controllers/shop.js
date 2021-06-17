const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.findAll()
  .then(products =>{
    res.render('shop/product-list',{ 'products': products, 'docTitle': 'Shop', 'path':'/products'})
  })
  .catch(err => {
    console.log(err);
  });
}

exports.getProduct = (req, res, next) => {
  const productId = req.params.id;
  Product.findAll({where: {id: productId}})
  .then((products) =>{
    res.render('shop/product-detail',{'product': products[0], 'docTitle': 'Shop', 'path':'/products' });
  })
  .catch(err => {
    console.log(err)
  })
  // Product.findByPk(productId)
  // .then((product) =>{
  //   res.render('shop/product-detail',{'product': product, 'docTitle': 'Shop', 'path':'/products' });
  // })
  // .catch(err => {
  //   console.log(err)
  // })
}

exports.getIndex = (req, res, next) => {
  Product.findAll()
  .then(products =>{
    res.render('shop/index',{ 'products': products, 'docTitle': 'Shop', 'path':'/'})
  })
  .catch(err => {
    console.log(err);
  });
}

exports.getCart = (req, res, next) => {
  req.user.getCart()
  .then(cart =>{
    return cart.getProducts();
  })
  .then(products =>{
    res.render('shop/cart',{'docTitle': 'Shop', 'path':'/cart', products: products});
  })
  .catch(err => {
    console.log(err);
  })
};

exports.postCart = (req, res, next) => {
  const productId = req.body.productId;
  let fetchedCart;
  let newQty = 1;
  req.user.getCart()
  .then(cart =>{
    fetchedCart = cart;
    return cart.getProducts({where: {id: productId}})
  }).then(products =>{
    let product
    if(products.length > 0){
      product = products[0];
    }
    if(product){
      const oldQty = product.cartItem.quantity;
      newQty = oldQty + newQty;
      return product;
    }
    return Product.findByPk(productId);
  })
  .then(product =>{
    return fetchedCart.addProduct(product,{
            through: {quantity: newQty}
          });
  })
  .then(()=>{
    res.redirect('/cart')
  })
  .catch(err =>{
    console.log(err);
  });
}

exports.postCartDeleteCartItem = (req, res, next) => {
  const productId = req.body.productId;
  req.user.getCart()
  .then(cart =>{
    return cart.getProducts({ where: {id: productId}});
  })
  .then(products =>{
    const product = products[0];
    return product.cartItem.destroy()
  })
  .then(()=>{
    res.redirect('/cart');
  })
  .catch(err =>{
    console.log(err);
  });
  // Product.findById(productId,(product)=>{
  //   Cart.deleteProduct(productId, product.price);
  //   
  // });
  
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders',{'docTitle': 'Your orders', 'path':'/orders'})
}

exports.getCheckout = (req, res, next) => {
  res.render('shop/checkout',{'docTitle': 'Shop', 'path':'/checkout'})
}