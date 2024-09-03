const expres = require('express');
const { getUserController, updateUserController } = require('../controllers/userController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const router = expres.Router();

//routes
// GET USER | GET
router.get('/getUser',authMiddleware,getUserController)

// UPDATE PROFILE | PUT
router.put('/updateUser',authMiddleware,updateUserController)

module.exports = router