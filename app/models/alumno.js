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
	    type: Sequelize.DATEONLY
	},
	NumHijos: {
	    type: Sequelize.STRING
	},
	Sexo: {
	    type: Sequelize.STRING
	},
	EstadoCivil: {
	    type: Sequelize.STRING
	},
	PadreTutor: {
	    type: Sequelize.STRING
	},
	RFC: {
	    type: Sequelize.STRING
	},
	Curp: {
	    type: Sequelize.STRING
	},
	GrupoEtnico: {
	    type: Sequelize.STRING
	},
	TrabajoDeAlumno: {
	    type: Sequelize.STRING
	},
	NumDependientes: {
	    type: Sequelize.STRING
	},
	Municipio: {
	    type: Sequelize.STRING
	},
	Estado: {
	    type: Sequelize.STRING
	},
	Pais: {
	    type: Sequelize.STRING
	},
	Extranjero: {
	    type: Sequelize.STRING
	},
	PadresExtranjeros: {
	    type: Sequelize.STRING
	},
	Peso: {
	    type: Sequelize.STRING
	},
	Estatura: {
	    type: Sequelize.STRING
	},
	TipoSangre: {
	    type: Sequelize.STRING
	},
	AntecedMedicos: {
	    type: Sequelize.STRING
	},
	OtroAnteced: {
	    type: Sequelize.STRING
	},
	discapacidad: {
	    type: Sequelize.STRING
	},
	NumSeguroSocial: {
	    type: Sequelize.STRING
	},
	Calle: {
	    type: Sequelize.STRING
	},
	Colonia: {
	    type: Sequelize.STRING
	},
	Ciudad: {
	    type: Sequelize.STRING
	},
	NumExterior: {
	    type: Sequelize.STRING
	},
	CodPost: {
	    type: Sequelize.STRING
	},
	EstadoDomi: {
	    type: Sequelize.STRING
	},
	TelefonoCasa: {
	    type: Sequelize.STRING
	},
	TelefonoCel: {
	    type: Sequelize.STRING
	},
	Facebook: {
	    type: Sequelize.STRING
	},
	Preparatoria: {
	    type: Sequelize.STRING
	},
	Especialidad: {
	    type: Sequelize.STRING
	},
	PromedioFinal: {
	    type: Sequelize.STRING
	},
	Semestre: {
	    type: Sequelize.STRING
	},
	PreparatoriaEstado: {
	    type: Sequelize.STRING
	},
	TurnoParaEntrevist: {
	    type: Sequelize.STRING
	},
	Medios: {
	    type: Sequelize.STRING
	},
	NumInstitucionesConsidera: {
	    type: Sequelize.STRING
	},
	JustificacionDeEleccion: {
	    type: Sequelize.STRING
	},

  });

};