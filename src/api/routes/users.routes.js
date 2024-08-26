const express = require("express");
const {register,login, checkSession} = require("../controllers/users.controllers");
const {isAuth} = require("../../middlewares/auth");

const userRoutes = express.Router();

userRoutes.post("/register",register);
userRoutes.post("/login",login);
userRoutes.get("/checksession", isAuth,checkSession);

module.exports = userRoutes;