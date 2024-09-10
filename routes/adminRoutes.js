const expres = require('express');
const {adminController, adminloginController} = require('../controllers/adminController');
const adminMiddlewere = require('../middlewares/adminMiddlewere');
const router = expres.Router();


//routes

// ADMIN ROUTE | POST
router.post("/register",adminController)

// ADMIN LOGIN ROUTE | GET
router.post("/login",adminMiddlewere,adminloginController)


module.exports = router