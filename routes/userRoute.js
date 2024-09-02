const expres = require('express');
const { getUserController } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = expres.Router();

//routes
// GET USER | GET
router.get('/getUser',authMiddleware,getUserController)

module.exports = router