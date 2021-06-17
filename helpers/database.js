const Sequelize = require('sequelize');

const sequelize = new Sequelize('node-complete','root', 'sisteract2',{dialect: 'mysql', host: 'localhost'});

module.exports = sequelize;