const expres = require('express');
const { authMiddleware } = require('../middlewares/authMiddleware');
const { createResturantController } = require('../controllers/restaurantController');
const router = expres.Router();

//routes
router.post('/create', authMiddleware, createResturantController);

module.exports = router