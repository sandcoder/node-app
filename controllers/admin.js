const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/edit-product',{docTitle: 'Add product', path: '/admin/add-product', editing: false})
  // res.sendFile(path.join(rootDir, 'views', 'add-product.html'));
};


exports.postAddProduct = (req, res, next) => {
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  req.user.createProduct({
    title: title,
    price: price,
    imageUrl: imageUrl, 
    description: description
  })
  .then(result =>{
    console.log("Create product");
    res.redirect('/admin/products');
  })
  .catch(err => {
    console.log("Product creation error");
  })
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const productId = req.params.id;
  // Product.findAll({where: {id: productId}})
  const user = req.user
  user.getProducts({where: {id: productId}})
  .then((products) =>{
    res.render('admin/edit-product',{'product': products[0],docTitle: 'Edit product',path: '/admin/edit-product',
              editing: editMode });
  })
  .catch(err => {
    console.log(err)
  }) 
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  Product.findByPk(id)
  .then(product =>{
    product.title = title;
    product.imageUrl = imageUrl;
    product.description = description;
    product.price = price;
    return product.save();
  })
  .then(result =>{
    res.redirect('/admin/products')
  })
  .catch(err =>{
    console.log(err);
  })
};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.productId;
  // Product.destroy({where: {id: id }});
  Product.findByPk(id)
  .then(product=>{
    return product.destroy();
  }).then(result=>{
    console.log("DESTROYED PRODUCT")
    res.redirect('/admin/products');
  }).catch(err=>{
    console.log(err);
  }); 
};

exports.getProducts = (req, res, next) => {
  // Product.findAll()
  req.user.getProducts()
  .then(products =>{
    res.render('admin/products-list',{ 'products': products, 'docTitle': 'admin products', 'path':'/admin/products'})
  })
  .catch(err => {
    console.log(err);
  });
}