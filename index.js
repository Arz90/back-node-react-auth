
//el orden es fundamental para su funcionamiento

const express = require('express'); // maneja el servidor a nivel local
const {connect} = require("./src/utils/db"); // nos traemos nuestra funcion connect del archivo db.js
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config(); //traigo el dotenv para decirle a la aplicacion que lo tengo oculto y lo configuro
const cloudinary = require("cloudinary").v2; //nos traemos la libreria cloudinary en la Version 2

const librosRouter = require("./src/api/routes/libros.routes");
const autoresRouter = require('./src/api/routes/autores.routes');
const userRoutes = require('./src/api/routes/users.routes');

const PORT=process.env.PORT; // donde se conectara express. de 3000 en adelante. puerto de react por defecto el 3000. y actuamos igual que con URL. la ocultamos y llamamos con el process
cloudinary.config({ 
    cloud_name: process.env.CLOUDINARY_NAME, //traemos de .env los datos de cloudinary
    api_key: process.env.CLOUDINARY_KEY, 
    api_secret: process.env.CLOUDINARY_SECRET
});


const app = express(); // que express se ejecute a través de app en modo local
connect(); // arrancamos nuestra funcion connect, ver mensaje de terminal. se conecta a mongo

//el "next" que hace es que siga ejecutando la funcion aunque se rompa 
app.use((req,res,next) => {
    res.header("Access-Control-Allow-Method", "POST, GET, PUT, DELETE, PATCH")
    // metodos que permitimos a alguien hacer, en este caso todos
    res.header("Access-Control-Allow-Credentials", "true")
    // permitimos la conexion con el token
    res.header("Access-Control-Allow-Headers", "Content-Type")
    // permitimos los header del tipo content-type   
    next()     
});

app.use(cors(
    {
        origin:"*", // acceso desde cualquier sitio
        // origin:["http://localhost:4200"], asi le damos acceso solo desde donde queramos
        credentials:true
    }
));


app.use(express.json());//va convertir lo que reciba de postman  de otro sitio en json, de ahi el undefined cuando haciamos el post desde postman

// mostrara el endpoint con la primera coincidencia. si cambiamos el orden todo cambia
app.use("/libros",librosRouter);
app.use("/autores",autoresRouter);
app.use("/users",userRoutes);

app.use("/", (req,res)=>{ //muestrame esto en el home o primera pagina de mi app
    res.json("esto es el home");
});


app.listen(PORT,()=> console.log(`escuchando en el puerto http://localhost:${PORT}`)) // en consola veremos nuestro puerto activado o escuchado y en clicando en localhost nos llevará a nuestra pagina



