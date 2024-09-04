const expres = require('express');
const  {
    createCatergoryController,
    getAllCatController, 
    updateCatController, 
    deleteCatController
}  = require('../controllers/categoryController');
const { authMiddleware } = require('../middlewares/authMiddleware');

const router = expres.Router();

//routes

// POST CATEFORY ROUTE | POST
router.post("/create",authMiddleware,createCatergoryController);

// GET ALL CATEGORY ROUTE | GET
router.get('/getAll',getAllCatController)

// UPDATE CATEGORY ROUTE | PUT
router.put('/update/:id',authMiddleware,updateCatController)

// DELETE CATEGORY ROUTE | PUT
router.delete('/delete/:id',authMiddleware,deleteCatController)

module.exports = router