const User = require("../models/users.model");
const {generateSign} = require("../../utils/jwt");
const {validateEmail,validatePassword,usedEmail} = require("../../utils/validators");
const bcrypt = require("bcrypt"); // traemos bcrypt para encriptar nuestro password


const register = async(req,res) => {
    try {
        const newUser = new User(req.body);
        if(!validateEmail(newUser.email)) {
            return res.status(400).json({message:"ese email no cumple con las validaciones"})
        }
        if(!validatePassword(newUser.password)) {
            return res.status(400).json({message:"ese password no cumple con las validaciones Mínimo ocho y máximo 10 caracteres, al menos una letra mayúscula, una letra minúscula, un número y un carácter especial"})
        }
        if(await usedEmail(newUser.email)){
            return res.status(400).json({message:"email ya esta usado"})
        }
        // encriptar nuestro password
        newUser.password = bcrypt.hashSync(newUser.password,10);
        const createdUser = await newUser.save();
        return res.status(201).json(createdUser);

    } catch (error) {
        return res.status(500).json(error);
    }
};

const login = async(req,res)=>{
    try {
        const userInfo = await User.findOne({email: req.body.email});
        if (!userInfo) {
            return res.status(404).json({message:"email no existe"})
        }//comprobamos si el email existe
        if (!bcrypt.compareSync(req.body.password, userInfo.password)){
            return res.status(404).json({message:"el password no es correcto"})
        }//comprobamos si la contraseña es existe y es correcta
        
        const token = generateSign(userInfo._id, userInfo.email);
        return res.status(200).json({user: userInfo, token: token});
        
    } catch (error) {
        return res.status(500).json(error);
        
    }
};

const checkSession = (req,res)=>{
    try {
        return res.status(201).json(res.user)        
    } catch (error) {
        return res.status(500).json(error)        
    }
}

module.exports = {register,login, checkSession};