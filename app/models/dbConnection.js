var Sequelize = require('sequelize');

const sequelize = new Sequelize
('mysql://bf3a13a7df5b2f:e2707ede@us-cdbr-iron-east-03.cleardb.net/heroku_6bdb0d8ad6c6a50?reconnect=true');

module.exports = sequelize;