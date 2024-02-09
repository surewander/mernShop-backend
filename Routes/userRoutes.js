const express = require('express');
const router = express.Router();
const userContoller = require('../Controllers/userController')

router.post('/sign-up',userContoller.signUpUser)
router.post('/sign-in',userContoller.signInUser)

module.exports = router;

