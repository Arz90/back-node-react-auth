const Autor = require("../models/autor.model");

const getAutores = async (req,res) =>{
    try {
        const allAutores = await Autor.find().populate("titulos", "titulo genero tipo"); //esta constante esperara a Autor
        // populate nos enseñara todo lo que hay en la id.luego le decimos que queremos que muestre.SIN COMA
        return res.status(200).json(allAutores)  //si todo va bien. transforma a json todos los Autores      
        
    } catch (error) {
        return res.status(500).json(error);
        
    }
    
};

const postAutor = async (req,res) => {
    
    try {
        const newAutor = new Autor(req.body);//req.body seria el schema que hemos creado
        const createdAutor = await newAutor.save(); //haz la espera para crear el Autor y si todo va bien guardalo
        return res.status(201).json(createdAutor); //201 es la peticion de crear, me enseñas createdAutor  
        
    } catch (error) {
        return res.status(500).json(error);
    }
}

module.exports = { getAutores, postAutor };