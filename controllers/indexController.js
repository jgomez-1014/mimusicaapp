const Mongo = require('mongodb').MongoClient;
const URL = 'mongodb://localhost:27017/';

/* Controlador para imprimir el Home */
const indexController = (req, res) =>{
    res.render('index');
}

const indexApodoController = (req, res) =>{

    const { Apodo } = req.body;
    if (Apodo == "") {
    let validacion = "¡Esta vacio el campo eh 🤦 !";
    res.render('index', { validacion })
    }
    else {
    Mongo.connect(URL, (error, db) => {
        if (error) throw error;
        const dbo = db.db('sprint1g6')
        const data = {
            apodo: Apodo
        }
        dbo.collection('apodostabla').insertOne(data, (err,collection) => {
            if (error) throw error;
            let validacion = "Hemos guardado tu apodo no lo olvides";
            res.render('index', { validacion })                
            console.log('Inserción de datos exitosa!');
        });   
    })        
};
}

module.exports = {indexController, indexApodoController};

