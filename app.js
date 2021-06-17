const express = require('express');
const path = require('path');
const sequelize = require('./helpers/database');

const app = express();
app.set('view engine', 'ejs');
app.set('views', 'views');

const errorsController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');

const Product = require('./models/product');
const User = require('./models/user');
const Cart = require('./models/cart');
const CartItem = require('./models/cart-item');
const Order = require('./models/order');
const OrderItem = require('./models/order-item');



app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'public')));

app.use((req, res, next) =>{
  User.findByPk(1)
  .then(user =>{
    req.user = user;
    next();
  })
  .catch(err =>{
    console.log("error")
  });
})

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorsController.get404);

Product.belongsTo(User,{constraints: true, onDelete: 'CASCADE'});
User.hasMany(Product);
User.hasOne(Cart);
Cart.belongsTo(User);
Cart.belongsToMany(Product, {through: CartItem});
Product.belongsToMany(Cart, {through: CartItem});
Order.belongsTo(User);
User.hasMany(Order);
Order.belongsToMany(Product, {through: OrderItem});

sequelize
.sync()
.then(result =>{
  return User.findByPk(1)
  // console.log("Database sync");
})
.then(user =>{
  if(!user){
    return User.create({name: "Sandeep", email: "sandeep@test.com"})
  }else{
    return Promise.resolve(user)
  }
}).then(user =>{
  // console.log(user)
  return user.createCart();
}).then(cart =>{
  app.listen(3000);
})
.catch(err => {
  console.log("Database sync error");
});

