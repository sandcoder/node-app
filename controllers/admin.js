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
  const product = new Product(null,title, imageUrl, description, price);
  product.save();
  res.redirect('/')
}

exports.getEditProduct = (req, res, next) => {
  const editMode = req.query.edit;
  if(!editMode){
    return res.redirect('/');
  }
  const productId = req.params.id;

  Product.findById(productId, product => {
    if(!product){
      return res.redirect('/');
    }
    res.render('admin/edit-product',{'product': product,docTitle: 'Edit product',path: '/admin/edit-product',
              editing: editMode });
  });  
};

exports.postEditProduct = (req, res, next) => {
  const id = req.body.productId;
  const title = req.body.title;
  const imageUrl = req.body.imageUrl;
  const description = req.body.description;
  const price = req.body.price;
  const product = new Product(id,title, imageUrl, description, price);
  product.save();
  res.redirect('/admin/products')

};

exports.postDeleteProduct = (req, res, next) => {
  const id = req.body.productId;
  console.log(req.body)
  Product.deleteById(id);
  return res.redirect('/admin/products');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll(products => {
    res.render('admin/products-list',{ 'products': products, 'docTitle': 'admin products', 'path':'/admin/products'})
  });
}