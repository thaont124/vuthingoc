const express = require('express')
const { authJwt } = require("../middlewares");
const router = express.Router()
const {getAllUsers, createUser, updateUser, getUserById} = require('../controller/user.controller')
const {signin, signup} = require('../controller/auth.controller')


//Auth
router.get('/api/auth/signin', signin)
router.get('/api/auth/signup', signup)

//User
router.get('/api/users/:page/:limit', getAllUsers);
router.get('/api/user/:userId', getUserById)

router.post('/api/user/add', createUser)
router.put('/api/user/update/:userId', [authJwt.verifyToken, authJwt.isAdmin], updateUser)



module.exports = router;