
const Libro = require("../models/libro.model");

const {deleteFile} = require("../../middlewares/delete.file");

const getLibros = async (req,res) =>{
    try {
        const allLibros = await Libro.find(); //esta constante esperara a Libro
        return res.status(200).json(allLibros)  //si todo va bien. transforma a json todos los libros      
        
    } catch (error) {
        return res.status(500).json(error);
        
    }
    
};

const getLibroById = async (req,res)=> {
    try {
        const {id} = req.params;
        const libro = await Libro.findById(id);
        return res.status(200).json(libro)
    } catch (error) {
        return res.status(500).json(error)
    }
};

const postLibro = async (req,res) => {
    
    try {
        const newLibro = new Libro(req.body);//req.body seria el schema que hemos creado
        //console.log(req.file);
        if(req.file){
            newLibro.portada = req.file.path;
        } // en el nuevo libro que estamos creando si hay un archivo por subir sube solo el "path"
        const createdLibro = await newLibro.save(); //haz la espera para crear el libro y si todo va bien guardalo
        return res.status(201).json(createdLibro); //201 es la peticion de crear, me enseñas createdLibro  
        
    } catch (error) {
        return res.status(500).json(error);
    }
};

const putLibro = async (req,res)=>{ // put modifica
    try {
        const {id} = req.params;// params lee donde se encuentra el id.{id} va en llaves para desestructurarlo
        const putLibro = new Libro(req.body) //validamelo
        putLibro._id = id; // convertimos el _id creado de postman en id
        const updatedLibro = await Libro.findByIdAndUpdate(id,putLibro)// busca el id y metes el post libro
        if(!updatedLibro) { 
            return res.status(404).json({message:"el id de este libro no existe"})
        } // con esto si intentaramos modificar algo con una id no correspondiente (siempre con la misma longitud), tendriamos este mensaje
        return res.status(200).json(updatedLibro)
        
    } catch (error) {
        return res.status(500).json(error);        
    }
   
};

const deleteLibro = async(req,res)=> {
    try {
        const {id} = req.params; //buscame desectructurando el id
        const deleteLibro = await Libro.findByIdAndDelete(id); //cuando lo encuentres eliminalo
        if(!deleteLibro) { 
            return res.status(404).json({message:"el id de este libro no existe"})
        } 
        if (deleteLibro.portada.includes("cloudinary")) {
            deleteFile(deleteLibro.portada)
        } // si incluye portada hazme la funcion deleteFile

        return res.status(200).json(deleteLibro)
        
    } catch (error) {
        return res.status(500).json(error);
    }

};

module.exports = { getLibros, getLibroById, postLibro, putLibro, deleteLibro };