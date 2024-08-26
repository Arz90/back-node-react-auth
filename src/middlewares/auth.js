// aqui haremos las autorizaciones para usuarios

const User = require("../api/models/users.model");

const {verifySign} = require("../utils/jwt");

const isAuth = async(req,res,next) => {
    try {
        const authorization = req.headers.authorization; //cogemos el token de la autorizacion   
        //console.log(req.headers.authorization)

    if(!authorization) {
        return res.status(401).json({message:"no estas autorizado"})
    }

    const token = authorization.split(" ")[1] 
    // mi autorization es Bearer xxxx -> hago un split para quedarme con el xxxx

    if(!token) {
        return res.status(401).json({message:"token invalido"})
    }
    const tokenVerified = verifySign(token);
    //console.log(tokenVerified);
    if(!tokenVerified.id){
        return res.status(401).json(tokenVerified);
    }
    const userLogged = await User.findById(tokenVerified.id)
    req.user = userLogged;
    next()
    } catch (error) {
        return res.status(500).json(error);
        
    }
}

module.exports = {isAuth};