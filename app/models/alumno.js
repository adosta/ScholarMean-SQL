var Sequelize = require('sequelize');
const sequelize = new Sequelize
('mysql://bf3a13a7df5b2f:e2707ede@us-cdbr-iron-east-03.cleardb.net/heroku_6bdb0d8ad6c6a50?reconnect=true');


module.exports=function(sequelize, DataTypes){ 
  return alumno = sequelize.define("alumno", {
    _id: {
	    type: Sequelize.INTEGER,
	    primaryKey: true,
	    autoIncrement: true,
	},
	noMatricula: {
	    type: Sequelize.INTEGER,
	},
	Nombre: {
		type: Sequelize.STRING
	},
	ApellidoP: {
	    type: Sequelize.STRING
	},
	ApellidoM: {
	    type: Sequelize.STRING
	},
	FechaNac: {
	    type: Sequelize.DATE
	},
  });

};