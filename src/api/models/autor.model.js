const mongoose = require("mongoose");//ahora usamos mongoose porque ataca a la base de datos

const Schema = mongoose.Schema; //creamos al variable para devolver el esquema de mongoose

const autorSchema = new Schema(
    {
        nombre:{
            type:String,
            required:true
        },
        pais:{
            type:String,
            required:true
        },
        titulos:[{type:Schema.Types.ObjectId, ref:"libro"}],
        // para que busque por el objeto id. referencia es como se llama la tabla a la que corresponde la referencia
        foto:{
            type:String,
            required:false
        },
    },
    {
        timestamps:true //para una base de datos que se va a actualizar o modificar te crea un campo con una fecha de actualizacion y creacion
    }
)

const Autor = mongoose.model("autor", autorSchema);

module.exports = Autor;