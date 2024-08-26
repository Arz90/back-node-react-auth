const express = require("express"); //usamos express porque llamamos a la informacionde manera local
const upload = require("../../middlewares/upload.file");

const {getLibros, getLibroById, postLibro, putLibro, deleteLibro} = require("../controllers/libros.controllers"); // me traigo la funcion del controlador para Get

const librosRouter = express.Router(); //creamos la variable que exportaremos a index.js y usamos la funcion router

librosRouter.get("/:id",getLibroById) //al marcar id/:id te cubres las espaldas por si tienes otro endpoint como /pais..
librosRouter.get("/",getLibros) 
// llamamos al endpoint solo con "/" porque ya tenemos /libros en index.js
// y llamamos a la funcion GET creada en el controllers

librosRouter.post("/",upload.single("portada"),postLibro) // AQUI AÑADIMOS UPLOAD.SINGLE QUE SERIA SUBIDA DE UN ARCHIVO en este caso el archivo "portada" del modelo
librosRouter.put("/:id",putLibro) // modificamos libros a partir de id
librosRouter.delete("/:id",deleteLibro)

module.exports = librosRouter;