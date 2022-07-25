const express = require('express')
const router = express.Router()

const {register, login} = require('../controller/userController')

router.route('/register').post(register)
router.route('/login').post(login)

// router.route('/register', register)
// router.post('/login', login)

module.exports = router 