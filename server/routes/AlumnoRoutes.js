var chalk = require('chalk');
module.exports = function(io, models){
    var cleardb = require('../../app/models/dbConnection');
    
    //Se importa el modelo
    var Alumno = models.alumno;
    var Deposito = models.deposito;
    var Carrera = models.carrera;
    var Usuario = models.usuario;
    var Grupo = models.grupo;
    var router = require('express').Router();
    
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
        console.log("SE ESTA BUSCANDO");

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

    //Cargar archivos
    router.post('/Alumno/upload', function(req, res) {
      if (!req.files)
        return res.status(400).send('No files were uploaded.');
     
      // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file 
      let sampleFile = req.files.sampleFile;
     
      // Use the mv() method to place the file somewhere on your server 
      sampleFile.mv('/somewhere/on/your/server/filename.jpg', function(err) {
        if (err)
          return res.status(500).send(err);
     
        res.send('File uploaded!');
      });
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
                res.json(alumno);
            })
        });
        
    });


     return {router:router,model:Alumno}
};