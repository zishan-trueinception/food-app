const express = require("express");
const { testUserController } = require("../controllers/testController");

// router object 
const router = express.Router();

// routers GET | POST | PUT | DELETE

router.get('/test-user',testUserController)


// exports router
module.exports = router