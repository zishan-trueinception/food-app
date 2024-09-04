const expres = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { createResturantController, getAllResturantController, getResturantByIdController } = require('../controllers/restaurantController');
const router = expres.Router();

//routes

// RESTURANT CREATE ROUTE | POST
router.post('/create', authMiddleware, createResturantController);

// ALL RESTURANT GET ROUTE | GET
router.get('/getAll',getAllResturantController)

// GET RESTURANT BY ID | GET
router.get('/get/:id',getResturantByIdController)

module.exports = router