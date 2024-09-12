const expres = require('express');
const { registerController, loginController, verifyController, forgotController, updatepassword} = require('../controllers/authController ');
const adminMiddlewere = require('../middlewares/adminMiddlewere');

const router = expres.Router();


//routes

//REGISTER | POST
router.post("/register",registerController)

 // LOGIN 
router.post("/login",loginController)

// verify email
router.get('/verifyEmail',verifyController)

router.put("/reset",forgotController)

router.put('/resetPassword',updatepassword)




module.exports = router