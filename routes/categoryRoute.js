const expres = require('express');
const  {
    createCatergoryController,
    getAllCatController, 
    updateCatController, 
    deleteCatController
}  = require('../controllers/categoryController');
const { authMiddleware } = require('../middlewares/authMiddleware');
const adminMiddlewere = require('../middlewares/adminMiddlewere');

const router = expres.Router();

//routes

// POST CATEFORY ROUTE | POST
router.post("/create",adminMiddlewere,createCatergoryController);

// GET ALL CATEGORY ROUTE | GET
router.get('/getAll',getAllCatController)

// UPDATE CATEGORY ROUTE | PUT
router.put('/update/:id',adminMiddlewere,updateCatController)

// DELETE CATEGORY ROUTE | PUT
router.delete('/delete/:id',adminMiddlewere,deleteCatController)

module.exports = router