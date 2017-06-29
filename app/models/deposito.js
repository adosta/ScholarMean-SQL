var Sequelize = require('sequelize');
const sequelize = new Sequelize
('mysql://bf3a13a7df5b2f:e2707ede@us-cdbr-iron-east-03.cleardb.net/heroku_6bdb0d8ad6c6a50?reconnect=true');


module.exports=function(sequelize, DataTypes){ 
  return deposito = sequelize.define("deposito", {
  _id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  monto: {
    type: Sequelize.DOUBLE
  },
  fecha: {
    type: Sequelize.DATE
  }, 

  });
};