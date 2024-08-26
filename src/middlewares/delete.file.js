const cloudinary = require("cloudinary").v2;

const deleteFile = (url) => {
    //console.log(url);
    const imgSplitted = url.split("/")
    //generamos con esto un array de cada elemento que este separado por "/"
    // console.log(imgSplitted);
    const nameSplitted = imgSplitted[imgSplitted.length - 1].split(".");
    // creame un array que me separe el nombre de la imagen de su extension
    const folder = imgSplitted[imgSplitted.length - 2];
    // nos guardamos la carpeta
    const imgToDelete = `${folder}/${nameSplitted[0]}`;
    //que carpeta y que nombre queremos eliminar

    cloudinary.uploader.destroy(imgToDelete, ()=> console.log("imagen borrada"))

}

module.exports = {deleteFile}