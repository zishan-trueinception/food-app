const expres = require('express');
const  categorycontroller  = require('../controllers/categoryController');

const router = expres.Router();

//routes
//For Food Category
router.get("/Category",categorycontroller);
router.post("/Category",categorycontroller);

module.exports = router