// esto es un como una copia de seguridad.
// si en postman han hecho muchos post que no quieres. vuelves arrancar npm run libros-seed y vuelves a tener en el get todo lo que tienes aqui

const mongoose = require("mongoose"); // para cargar mi base de datos
require("dotenv").config(); // para acceder a la variable
const Libro = require("../api/models/libro.model"); 

const DB_URL = process.env.DB_URL;

const arrayLibros = [
    {
        "titulo": "El enigma del bosque",
        "tipo": "Alternativa",
        "genero": "Fantasia"
    },
    {
        "titulo": "Caminos sin retorno",
        "tipo": "Novela",
        "genero": "Aventuras"
    },
    {
        "titulo": "Sombras en la niebla",
        "tipo": "Ensayo",
        "genero": "Terror"
    },
    {
        "titulo": "Bajo la luna llena",
        "tipo": "Poesia",
        "genero": "Romantico"
    },
    {
        "titulo": "El vuelo de los dragones",
        "tipo": "Teatro",
        "genero": "Fantasia"
    },
    {
        "titulo": "El misterio de la montaña",
        "tipo": "Novela",
        "genero": "Terror"
    }
    
];

mongoose
.connect(DB_URL) // nos conectamos a nuestra base de datos
.then(async ()=>{ 
    const allLibros = await Libro.find(); // obten tdos los libros de la coleccion
    if (allLibros.length > 0) { // si existen libros
        await Libro.collection.drop(); // si tiene contenido borrame todo
        console.log("libros borrados"); 
    }
    // catch = capturame el error
}).catch((error)=> console.log("error borrando libros", error))
  .then(async ()=>{
    const libroMap = arrayLibros.map((libro)=> new Libro(libro)); // esta variable recorre cada uno de los libros de arrayLibros y pasame por mi validacion Libro(Schema) mi modelo
    await Libro.insertMany(libroMap); //si cuadra inserta a mi coleccion todos los libros que pasen por la validacion
    console.log("libros creados");

}).catch((error)=> console.log("error insertando libros", error))
  .finally(()=> mongoose.disconnect());
// si pasamos todos los errores sin ellos desconectate de mi base de datos