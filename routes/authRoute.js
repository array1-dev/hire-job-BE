const express = require("express")
const router = express.Router()
const { register, verify, login, forgotPass, changePassword, verifyToken, verifyCode } = require('../controllers/authController')

router.post('/register', register)
router.post('/forgot-pass', forgotPass)
router.post('/verify', verify)
router.post('/login', login)
router.patch('/change-pass', changePassword)
router.post('/verify-token', verifyToken)
router.post('/verify-code', verifyCode)


module.exports = router