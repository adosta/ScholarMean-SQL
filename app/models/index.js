var Sequelize = require('sequelize');

const sequelize = new Sequelize
('mysql://bf3a13a7df5b2f:e2707ede@us-cdbr-iron-east-03.cleardb.net/heroku_6bdb0d8ad6c6a50?reconnect=true');

// load models
var models = [
  'alumno',
  'deposito',
  'grupo',
  'carrera',
  'usuario',
  'archivo'
];

models.forEach(function(model) {
  module.exports[model] = sequelize.import(__dirname + '/' + model);
});


/// describe relationships
(function(m) {
  m.deposito.belongsTo(m.alumno, {foreignKey: '_alumno'});

  m.alumno.hasMany(m.deposito, {foreignKey: '_alumno'});
  m.alumno.belongsTo(m.grupo, {foreignKey: '_grupo'});
  m.alumno.hasMany(m.archivo, {foreignKey: '_archivo'});
  m.alumno.belongsTo(m.carrera, {foreignKey: '_carrera'});

  m.grupo.hasMany(m.alumno, {foreignKey: '_grupo'});
  m.grupo.belongsTo(m.carrera, {foreignKey: '_carrera'});

  m.carrera.hasMany(m.grupo, {foreignKey: '_carrera'});
  m.carrera.hasMany(m.alumno, {foreignKey: '_carrera'});
  
  m.archivo.belongsTo(m.alumno, {foreignKey: '_archivo'});

  m.usuario.hasOne(m.alumno, {foreignKey: '_usuario'});
  m.alumno.belongsTo(m.usuario, {foreignKey: '_usuario'});
})(module.exports);

sequelize.sync();

module.exports.sequelize = sequelize;