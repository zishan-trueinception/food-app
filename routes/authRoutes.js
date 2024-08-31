const expres = require('express');
const { registerController } = require('../controllers/authController ');

const router = expres.Router();


//routes
//REGISTER/POST
router.post("/register",registerController) 

module.exports = router