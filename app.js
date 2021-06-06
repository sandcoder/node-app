const express = require('express');
const path = require('path');
// var exphbs  = require('express-handlebars');

const app = express();
// app.engine('handlebars', exphbs());
app.set('view engine', 'ejs');
app.set('views', 'views');

const errorsController = require('./controllers/error');

const adminRoutes = require('./routes/admin');
const shopRoutes = require('./routes/shop');



app.use(express.urlencoded());
app.use(express.static(path.join(__dirname,'public')));

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use(errorsController.get404);

app.listen(3000)

// const routes = require('./routes');

// const server = http.createServer(app);

// server.listen(3000)

