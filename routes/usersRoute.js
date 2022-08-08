const express = require("express")
const router = express.Router()
const {getAllUsers,updateUsers, getBySlug, getById} = require("../controllers/usersController")
const upload = require("../helpers/multer")
const { isPekerja, isPerekru, isLogin } = require('../helpers/auth')


router.get('/', getAllUsers)
router.get('/id/:userId', isLogin, getById )
router.get('/:userSlug', getBySlug)
router.patch('/', isLogin, upload.single('userImage'),  updateUsers)
router.delete('/', isLogin, updateUsers)
module.exports = router