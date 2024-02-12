const express = require('express');
const {userController} = require('../controller')

const router = express.Router();

router.post("/signup", userController.signup)
router.post("/login", userController.login)
router.get("/user",  userController.verifyToken, userController.getUser)
// router.get('/refresh',  userController.refreshToken, userController.verifyToken,  userController.getUser )

module.exports = router