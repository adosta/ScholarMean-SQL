var chalk = require('chalk');
module.exports = function(io,models){
    //var mongoose = require('../../app/models/dbConnection');
    var cleardb = require('../../app/models/dbConnection');
    
    //Se importa el modelo
    var Usuario = models.usuario;

    var router = require('express').Router();
    
    // POST /api/Usuario
    /*
    * Registra un nuevo objeto de esta entidad
    */
    /*router.route('/usuario')
    .post(function(req, res) {
        // create a new instance of the Alumno model
        var nuevoUsuario = new Usuario({
            username:req.body.email,
            password:req.body.password,
            rol:'alumno',
        });

        console.log(nuevoUsuario);
        res.json(nuevoUsuario);
        // save the Alumno and check for errors
        nuevoUsuario.save(function(err) {
            if (err){console.log(chalk.red('error guardar nuevo usuario'));res.send(err);}
            else{
                //Si se salvo correctamente
                res.json(nuevoUsuario);
            }
        });
    });*/

    router.route('/usuario')
    .post(function(req, res) {
        // create a new instance of the carrera model
        var username = req.body.email;
        var password = req.body.password;
        var rol = 'alumno';
        
        // save the Carrera and check for errors
        Usuario.create({
            username: username,
            password: password,
            rol: rol
        })
        .then(newUsuario => {
            console.log(newUsuario);
            res.json(newUsuario);
        })
    });

    // POST /api/Usuario/authenticate
    /*
    * Registra un nuevo objeto de esta entidad
    */
    /*router.route('/usuario/authenticate')
    .post(function(req, res) {
        // save the Alumno and check for errors
        Usuario.findOne({email:req.body.email}, function(err,usuario) {
            if (err){
                console.log(chalk.red('error guardar nuevo usuario'));res.send(err);
            }
            else{
                console.log(chalk.blue('usuario: '+usuario));
                if(usuario.password == req.body.password){
                    console.log(chalk.red("aprobado"));
                    //Si se salvo correctamente
                    res.json(usuario);
                }
                else{
                    console.log(chalk.red("no permitido "+usuario.password+" -- "+req.body.password));
                    res.json({});
                }
            }
        });
    });*/
    router.route('/usuario/authenticate')
    .post(function(req, res) {
        Usuario.find({
            where:{email:req.body.email}
        })
        .then(usuario =>{
            if(usuario.password == req.body.password){
                res.json(usuario);
            }
            else{
                res.json({});
            }
        })
    });

    // GET /api/Usuario/:soloPreinscritos
    /*
    * Entrega un listado completo de todos los registros
    */
    router.route('/usuario/:id')
    .get(function(req, res) {
        id = req.params.id;
        //Listado de todas las Alumnos
        Usuario.findById(id,function(err,usuario) {
            if (err){console.log(chalk.red('Error: '+err));res.send(err);}
            else{
                res.json(usuario);
            }
        });
    });

    return {router:router,model:Usuario};
};