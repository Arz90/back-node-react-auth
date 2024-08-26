// nos traemos las 3 librerias de cloudinary

const multer = require("multer");
const cloudinary = require("cloudinary").v2;
const {CloudinaryStorage} = require("multer-storage-cloudinary");
// usamos como almacen CloudinaryStorage
const storage = new CloudinaryStorage(
    {
        cloudinary:cloudinary, //usame cloudinary para la subida de archivos
        params:{
            folder:"libreria", // creame una carpeta con este nombre
            allowedFormarts: ["jpg","png","jpeg","gif","webp","pdf"] //y solo soporta estos tipos de archivos
        }
    }
)

const upload = multer({storage}); // este fichero de descarga usa multer y gestiona mi almacen(storage)

module.exports = upload // para usarlo en otros archivos lo exportamos