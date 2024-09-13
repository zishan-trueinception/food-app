const expres = require('express');
const  {
    createCatergoryController,
    getAllCatController, 
    updateCatController, 
    deleteCatController
}  = require('../controllers/categoryController');
const { authMiddleware, adminAccessMiddleware } = require('../middlewares/authMiddleware');
const adminMiddlewere = require('../middlewares/adminMiddlewere');

const router = expres.Router();

//routes

// POST CATEFORY ROUTE | POST
router.post("/create",adminAccessMiddleware,createCatergoryController);

// GET ALL CATEGORY ROUTE | GET
router.get('/getAll',authMiddleware,getAllCatController)

// UPDATE CATEGORY ROUTE | PUT
router.put('/update/:id',adminAccessMiddleware,updateCatController)

// DELETE CATEGORY ROUTE | PUT
router.delete('/delete/:id',adminAccessMiddleware,deleteCatController)

module.exports = router