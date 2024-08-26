const express = require("express"); //usamos express porque llamamos a la informacionde manera local
const {getAutores, postAutor} = require("../controllers/autores.controllers"); // me traigo la funcion del controlador para Get
const {isAuth} = require("../../middlewares/auth");
 
const autoresRouter = express.Router(); //creamos la variable que exportaremos a index.js y usamos la funcion router

autoresRouter.get("/",isAuth,getAutores)
// llamamos al endpoint solo con "/" porque ya tenemos /autores en index.js
// y llamamos a la funcion GET creada en el controllers
// cerramos la ruta con "isAuth"

autoresRouter.post("/",postAutor) // post seria la ruta para añadir algo
/* autoresRouter.put("/:id",putAutor) // modificamos autores a partir de id
autoresRouter.delete("/:id",deleteAutor) */

module.exports = autoresRouter;