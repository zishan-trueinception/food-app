const expres = require('express');
const { registerController, loginController} = require('../controllers/authController ');

const router = expres.Router();


//routes

//REGISTER | POST
router.post("/register",registerController)

 // LOGIN 
router.post("/login",loginController)

module.exports = router