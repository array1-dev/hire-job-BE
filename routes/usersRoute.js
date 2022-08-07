const express = require("express")
const router = express.Router()
const {getAllUsers,updateUsers, getBySlug} = require("../controllers/usersController")
// const upload = require("../helpers/multer")
const { isPekerja, isPerekru, isLogin } = require('../helpers/auth')


router.get('/', getAllUsers)
router.get('/:userSlug', getBySlug)
router.patch('/', isLogin, updateUsers)
module.exports = router