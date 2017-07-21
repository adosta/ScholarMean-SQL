var chalk = require('chalk');
module.exports = function(io, models){
    var cleardb = require('../../app/models/dbConnection');
    
    //Se importa el modelo
    var Alumno = models.alumno;
    var Deposito = models.deposito;
    var Carrera = models.carrera;
    var Usuario = models.usuario;
    var Grupo = models.grupo;
    var multer = require('multer');
    var fs = require('fs');
    var glob = require("glob");
    var path = require('path');
    var router = require('express').Router();

    var DIR = './uploads/';
    

    var storage = multer.diskStorage({
            destination: function(req, file, cb) {
                    cb(null, DIR)
            },
             /*filename: function (req, file, cb) {
                cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
              }*/
    });

    var upload = multer({ storage: storage });
    
    // POST /api/Alumno
    /*
    * Registra un nuevo objeto de esta entidad
    */
    router.route('/Alumno')
    .post(function(req, res) {

        console.log("NOMBRE: "+req.body.Nombre);
        Usuario.create({
            email: req.body.user.email,
            password: req.body.user.password,
            rol: "alumno",
        })
        .then(function(usuario){
            Alumno.create({
                Nombre: req.body.alumno.Nombre,
                ApellidoP: req.body.alumno.ApellidoP,
                ApellidoM: req.body.alumno.ApellidoM,
                FechaNac: req.body.alumno.FechaNac,
                _carrera: req.body.alumno._carrera
            })
            .then(function(alumno){
                usuario.setAlumno(alumno);
                res.json(alumno);
            })
        })
    });

    // PUT /api/Alumno
    /*
    * Edita un objeto de esta entidad
    */
    router.route('/Alumno')
    .put(function(req, res) {

        
        // Busca instancia existente en la base de datos
        Alumno.findById(req.body._id)
        .then(alumnoEditado => {

            var Nombre = req.body.Nombre;
            var ApellidoP = req.body.ApellidoP;
            var ApellidoM = req.body.ApellidoM;
            var FechaNac = req.body.FechaNac;
            var noMatricula = req.body.noMatricula;
            var tempCarreraID = alumnoEditado._carrera;
            var _carrera = req.body._carrera;
            console.log("CARRERA: "+_carrera);

            alumnoEditado.updateAttributes({
                Nombre: Nombre,
                ApellidoP: ApellidoP,
                ApellidoM: ApellidoM,
                FechaNac: FechaNac,
                noMatricula: noMatricula,
                _carrera: _carrera,
            })
            res.json(alumnoEditado);
        })
    });

    // POST /api/Alumno/buscar
    /*
    * Buscador por nombre, carrera y/o grupo
    */
    router.route('/Alumno/buscar')
    .post(function(req, res) {
        console.log(chalk.blue("POST /api/Alumno/buscar"));
        console.log(chalk.blue('Nombre:')+chalk.red(req.body.Nombre));
        console.log(chalk.blue('Carrera:')+chalk.red(req.body._carrera));
        var nombre = req.body.Nombre;
        //Listado de todas las Alumnos
        Alumno.findAll({
            /*$and:[
            //Busca aquellos inscritos, al omitir aquellos que tengan campos nulos
                {_carrera:req.body._carrera?req.body._carrera:{$ne:null}},
                {_grupo:req.body._grupo?req.body._grupo:{$ne:null}}, 
                {$or:[
                    {ApellidoM:regexNombre},
                    {ApellidoP:regexNombre},
                    {Nombre:regexNombre},
                ]}
            ]*/
            where:{
                    $and:{
                        _carrera: req.body._carrera?req.body._carrera:{$ne:null},
                        _grupo:req.body._grupo?req.body._grupo:{$ne:null},
                        $or:{
                            Nombre:{
                                $like: '%'+nombre+'%'
                            },
                            ApellidoP:{
                                $like: '%'+nombre+'%'
                            },
                            ApellidoM:{
                                $like: '%'+nombre+'%'
                            }
                        }
                    }
            },
            include:[Grupo]
        }).then(alumnos => {
            res.json(alumnos);
        });
    });

    // GET /api/Alumno/:soloPreinscritos
    /*
    * Entrega un listado completo de todos los alumnos preinscritos
    */
    router.route('/Alumno/')
    .get(function(req, res) {

        //Listado de todas las Alumnos
        Alumno.find().populate("_carrera").exec(function(err,Alumnos) {
            //console.log(Alumnos);

            if (err){console.log(chalk.red('Error: '+err));res.send(err);
            }else{
                res.json(Alumnos);
            }
        });
    });

    // GET /api/Alumno/:soloPreinscritos
    /*
    * Entrega un listado completo de todos los alumnos preinscritos
    */
    router.route('/Alumno/soloPreinscritos')
    .get(function(req, res) {
        Alumno.findAll({
            where: {
                _grupo: null
          }, include: [Carrera]
        }).then(alumnos => {
            console.log(alumnos);
            res.json(alumnos);
        });
    });

    // DELETE /api/Alumno:id
    /*
    * Elimina el registro identificado por el ID indicado
    */
    router.route('/Alumno/:id')
    .delete(function(req, res) {
        var id = req.params._id;
        console.log("IDE PARA BORRAR: ",req.params._id);
        Alumno.destroy({
            where: {
                _id: id
            }
        })
        .then(deletedAlumno => {
        res.json(deletedAlumno);
      });

    });
    // GET /api/Alumno:id
    /*
    * Entrega toda la informacion concreta dado
    * un ID sobre un registro especifico de esta entidad
    */
    router.route('/Alumno/:id')
    .get(function(req, res) {
        var id = req.params.id;
        //Se busca por ID
        Alumno.findOne({
            where:{
                _id:id
            },
            include:[Carrera,Grupo,Deposito]
        })
        .then(alumno=>{
            res.json(alumno);
        })
    });

     /*router.route('/Alumno/getUser/:id')
    .get(function(req, res) {
        var id = req.params._id;
        consoe.log("SE ESTA BUSCANDO");

        //Se busca por ID
        Alumno.findOne({
            where:{
                _id:id
            },
            include:[Carrera,Grupo]
        })
        .then(alumno=>{
            res.json(alumno);
        })
    });*/


    router.post('/Alumno/upload/:id', upload.single("file"), function(req, res, next) {
        // req.body contains the text fields
        console.log(req.params.id);
        console.log(req.body.tipoDocumento);
        console.log(req.file.mimetype);
        var nombre = req.file.filename;

        Alumno.find({
            where:{
                _id: req.params.id
            }
        })
        .then(alumno=>{
            
            fs.rename('./uploads/'+nombre, './documentos/'+req.body.tipoDocumento+'/'
            +alumno.noMatricula+path.extname(req.file.originalname), function(err) {
            if ( err ) console.log('ERROR: ' + err);
            });

            console.log("Fuera de callback");
            res.json('file uploaded');
            next();
        })

        /*fs.rename('./uploads/'+nombre, './documentos/'+req.body.tipoDocumento+'/'
            +nombre+path.extname(req.file.originalname), function(err) {
            if ( err ) console.log('ERROR: ' + err);
        });

        console.log("Fuera de callback");
        res.json('file uploaded');
        next();*/
    });

    router.route('/descargarDocumento/:id/:tipo')
    .get(function (req, res) {
        var formato = ['.jpg','.pdf','.png'];
        console.log(req.params.id);
        console.log(req.params.tipo);

        Alumno.find({
            where:{
                _id: req.params.id
            }
        })
        .then(alumno=>{
            for(var i=0; j=2,i<=j; i++){
                var existe = fs.existsSync('./documentos/'+req.params.tipo+'/'+alumno.noMatricula+formato[i])
                if (existe == true){
                    res.download('./documentos/'+req.params.tipo+'/'+alumno.noMatricula+formato[i])
                }
            }
        })
    });

    router.route('/verificarDocumento/:matricula')
    .get(function (req, res) {
        var formato = ['.jpg','.pdf','.png'];
        var tipo = ["acta","constancia"];
        console.log(req.params.matricula);
        matricula = req.params.matricula;
        var existencia = new Array();

        for(var i=0; i<=1; i++){
            for(var j=0; j<=2; j++){
                var existe = fs.existsSync('./documentos/'+tipo[i]+'/'+matricula+formato[j])
                existencia.push({tipo:tipo[i],existe:existe});
            }
        }
        console.log(existencia);
        res.json(existencia);
    });

    // GET /api/Alumno/registrarAlumno:id
    /*
    * Se confirma la inscripcion de un estudiante, registrandolo a un grupo
    * por defecto, en caso de no existir grupo, crea uno y es registrado
    */
    router.route('/Alumno/registrarAlumno/:id')
    .get(function(req, res) {
        var id = req.params.id;
        var grupoDelAlumno;
        console.log("ID DE BUSQUEDA: "+id)

        Alumno.findById(id)
        .then(alumno => {
            console.log("DATOS DE ALUMNO: "+alumno);
            Carrera.find({
                where: {_id: alumno._carrera},
                include: [Grupo]
            })
            //.populate('_grupos')
            .then(carrera => {
                console.log(chalk.red("CARRERAID: "+ carrera._id));
                console.log("ESTOS SON LOS DATOS: "+carrera);
                if(carrera.grupos.length===0){
                    Grupo.create({
                        nombre: carrera.abreviacion+'1-1',
                        _carrera: carrera._id,
                    })
                }
                console.log(chalk.green("DATOS DE CARRERA:",carrera))
                alumno.updateAttributes({
                    _grupo: carrera.grupos[0]._id
                })

                Grupo.find({
                    where: {_id: carrera.grupos[0]._id},
                    include: [Alumno]
                })
                .then(grupo=>{
                    var noMatricula = alumno.createdAt.getFullYear().toString().substr(2,2);
                    noMatricula+='30';
                    noMatricula+=carrera.num*10;
                    console.log(noMatricula);
                    var numAlumnos = grupo.alumnos.length;
                    noMatricula+=numAlumnos<10?'0'+numAlumnos:numAlumnos;
                    //alumno.noMatricula = noMatricula;
                    console.log(chalk.red(alumno.noMatricula));
                    alumno.updateAttributes({
                        noMatricula: noMatricula
                    })
                })

                /*var grupo = carrera.grupos[0]
                console.log("GRUPO: ",grupo);
                var noMatricula = alumno.createdAt.getFullYear().toString().substr(2,2);
                noMatricula+='30';
                noMatricula+=carrera.num*10;
                console.log(noMatricula);
                var numAlumnos = grupo.alumnos.length;
                noMatricula+=numAlumnos<10?'0'+numAlumnos:numAlumnos;
                alumno.noMatricula = noMatricula;
                console.log(chalk.red(alumno.noMatricula));*/

                res.json(alumno);
            })
        });
        
    });


     return {router:router,model:Alumno}
};