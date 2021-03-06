var chalk = require('chalk');
module.exports = function(io,models){
    //var mongoose = require('../../app/models/dbConnection');
    var cleardb = require('../../app/models/dbConnection');
    
    //Se importa el modelo
    var Carrera = models.carrera;
    var Grupo = models.grupo;

    var router = require('express').Router();
    // middleware to use for all requests
    /*router.use(function(req, res, next) {
        // do logging
        console.log('Something is happening.');
        next(); // make sure we go to the next routes and don't stop here
    });*/

    // POST /api/carrera
    /*
    * Registra un nuevo objeto de esta entidad
    */
    router.route('/carrera')
    .post(function(req, res) {
        // create a new instance of the carrera model
        var nombre = req.body.nombre;
        var abreviacion = req.body.abreviacion;
        var num = req.body.num;
        
        // save the Carrera and check for errors
        Carrera.create({
            nombre: nombre,
            abreviacion: abreviacion,
            num: num
        })
        .then(newCarrera => {
            console.log(newCarrera);
            io.sockets.emit('carreraCreada',newCarrera);
            res.json(newCarrera);
        })
    });

    // PUT /api/carrera
    /*
    * Edita un objeto de esta entidad
    */
    router.route('/carrera')
    .put(function(req, res) {
            var nombre = req.body.nombre;
            var abreviacion = req.body.abreviacion;
            var num = req.body.num;
        // Busca instancia existente en la base de datos
        Carrera.findById(req.body._id)
        .then(carrera => {
            console.log(carrera)
            carrera.updateAttributes({
                nombre: nombre,
                abreviacion: abreviacion,
                num: num
            });
        })
        .then(updatedCarrera => {
            io.sockets.emit('carreraEditada',updatedCarrera);
            res.json(updatedCarrera);
        });
    });

    // GET /api/carrera
    /*
    * Entrega un listado completo de todos los registros
    */
    router.route('/carrera')
    .get(function(req, res) {
        Carrera.findAll({
            include: [Grupo]
        })
        .then(carreras => {
            console.log("LISTA DE CARRERAS",chalk.green(carreras));
            res.json(carreras);
        });
        
    });

    // DELETE /api/carrera:id
    /*
    * Elimina el registro identificado por el ID indicado
    */

    router.route('/carrera/:id')
    .delete(function(req, res) {
        var id = req.params.id;
        Carrera.destroy({
            where: {
                _id: id
            }
        })
        .then(deletedCarrera => {
        res.json(deletedCarrera);
      });

    });

    // GET /api/carrera:id
    /*
    * Entrega toda la informacion concreta dado
    * un ID sobre un registro especifico de esta entidad
    */
    router.route('/carrera/:id')
    .get(function(req, res) {
        var id = req.params.id;
        //Listado de todas las carreras
        Carrera.find({
            where:{_id: id},
            include: [Grupo]
        })
        .then(carrera =>{
            //console.log("CARRERA: "+carrera.grupos[0]._id);
            res.json(carrera)
        })
    });


    return {router:router,model:Carrera};
};