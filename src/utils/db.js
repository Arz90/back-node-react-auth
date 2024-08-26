const mongoose = require ("mongoose"); //para conectar base de datos de manera remota
const dotenv = require("dotenv");
dotenv.config(); //traigo el dotenv para decirle a la aplicacion que lo tengo oculto y lo configuro

const DB_URL = process.env.DB_URL;  // donde me quiero conectar.En este caso con mongoDB. al tenerlo oculto en .env la llamamos asi

const connect = async () => {

    try {
        const db = await mongoose.connect(DB_URL); // indicamos donde nos vamos a conectar
        const {name,host} = db.connection;

        console.log(`conectado a la base de datos ${name} DB en el host ${host}`); // se conectara al cluster0 que es name y al host libreria
        
    } catch (error) {
        console.log("error conectando a nuestra bbdd");
        
    }
}

module.exports = { connect }; //exportamos esta funcion porque no nos interesa tenerla aqui sino en index.js