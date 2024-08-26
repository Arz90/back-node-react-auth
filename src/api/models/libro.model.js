const mongoose = require("mongoose");//ahora usamos mongoose porque ataca a la base de datos

const Schema = mongoose.Schema; //creamos al variable para devolver el esquema de mongoose

const libroSchema = new Schema(
    {
        titulo:{
            type:String,
            required:true
        },
        tipo:{
            type:String,
            enum:["Novela","Poesia","Ensayo","Teatro","Alternativa"],
            required:true
        },
        genero:
        {type:String,
            default:"Aventuras",
            enum:["Aventuras","Terror","Romantico","Fantasia"],
            required:true
        },
        portada:{
            type:String,
            require:false
        },     
        
    },
    
    {
        timestamps:true //para una base de datos que se va a actualizar o modificar te crea un campo con una fecha de actualizacion y creacion
    }

)

const Libro = mongoose.model("libro", libroSchema);// se pone la variable en mayuscula para hacer referecia a este schema y solo este

module.exports = Libro;



//enum => damos a elegir entre esas opciones
//required => si es un campo requerido o no
//default => si no se marca ninguno por defecto sera este
//require y required es igual de válido
// si no se marca require, su valor por defecto sera false