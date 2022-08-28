const Mongo = require('mongodb').MongoClient;
const URL = 'mongodb://localhost:27017/';


/* Controlador para imprimir el Agregar */
const agregarController = (req, res) =>{
  res.render('agregar');
}

/* Controlador para Guardar la nueva cancion */
const agregarCancionController = (req, res) =>{    
  const { titulo, artista, Apodo, fav } = req.body;
  console.log(req.body);
  if (titulo == "" || artista == "" || Apodo == "") {
  let validacion = "¡🤦 El apodo si o si y obvio el nombre de la cancion y el artista!";
  res.render("agregar", { validacion })
  }
  else {
    if (fav == "on") {
      let data = {
        tituloDB: titulo,
        artistaDB: artista,
        ApodoDB: Apodo,
        favDB: 1}
        Mongo.connect(URL, (error, db) => {
          if (error) throw error;
          const dbo = db.db('sprint1g6') //Creamos la piw porque la pwa ya esta creada
          dbo.collection('cancionestabla').insertOne(data, (err,collection) => {
              if (error) throw error;
              let validacion = "¡Agregamos la cancion a tu lista 💛!";
              res.render("agregar", { validacion })
              console.log('Inserción de datos exitosa!');
          });   
        }) 
      }
    else {
      let data = {
        tituloDB: titulo,
        artistaDB: artista,
        ApodoDB: Apodo,
        favDB: 0
      }

      Mongo.connect(URL, (error, db) => {
        if (error) throw error;
        const dbo = db.db('sprint1g6') //Creamos la piw porque la pwa ya esta creada
        dbo.collection('cancionestabla').insertOne(data, (err,collection) => {
            if (error) throw error;
            let validacion = "¡Agregamos la cancion a tu lista 💛!";
            res.render("agregar", { validacion })
            console.log('Inserción de datos exitosa!');
        });   
    })        
   }
  };  
}

module.exports = {agregarController, agregarCancionController};
