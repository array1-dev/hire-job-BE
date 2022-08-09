const express = require("express")
const router = express.Router()
const {getAllUsers,updateUsers,getUserId, getBySlug, getById, postHire} = require("../controllers/usersController")
const upload = require("../helpers/multer")
const { isPekerja, isPerekrut, isLogin, } = require('../helpers/auth')


router.get('/', getAllUsers)
router.get('/id/:userId', isLogin, getById )
router.get('/:userSlug', getBySlug)
router.post('/',isLogin, getUserId)
router.post('/hire/:userSlug',isLogin, postHire)
router.patch('/', isLogin, upload.single('userImage'),  updateUsers)
router.delete('/', isLogin, updateUsers)
module.exports = router