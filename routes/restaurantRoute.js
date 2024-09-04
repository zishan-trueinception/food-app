const expres = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { createResturantController, getAllResturantController, getResturantByIdController, deleteResturantController } = require('../controllers/restaurantController');
const router = expres.Router();

//routes

// RESTURANT CREATE ROUTE | POST
router.post('/create', authMiddleware, createResturantController);

// ALL RESTURANT GET ROUTE | GET
router.get('/getAll',getAllResturantController)

// GET RESTURANT BY ID | GET
router.get('/get/:id',getResturantByIdController)

// DELETE RESTURANT | DELETE
router.delete('/delete/:id',authMiddleware,deleteResturantController)

module.exports = router