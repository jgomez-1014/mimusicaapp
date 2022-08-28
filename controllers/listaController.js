const Mongo = require('mongodb').MongoClient;
const URL = 'mongodb://localhost:27017/';


/* Controlador para Renderizar mimusica */
const milistaController = (req, res) =>{
    res.render('mimusica')
}

/* Controlador para Guardar el Apodo el Home */
const buscarLista = (req, res) =>{    

    const { ApodoEX } = req.body;

    if (ApodoEX == "") {
        let validacion = "¡Esta vacio el campo eh 🤦 !";
        res.render('mimusica', { validacion })
    }
    else {
            console.log(ApodoEX)
            Mongo.connect(URL, (error, db) => {
            if (error) throw error;
            const dbo = db.db('sprint1g6') //Creamos la piw porque la pwa ya esta creada
            dbo.collection('cancionestabla').find({ApodoDB: ApodoEX}).toArray((error,results) => {
                if (error) throw error;
                res.render('mimusica', { tabla1: 'CANCIONESTABLA', ApodoEX, results})
                console.log('Busqueda exitosa!');
            });   
            })
        };
}

module.exports = {milistaController, buscarLista};

