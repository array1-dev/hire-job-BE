const express = require("express")
const router = express.Router()
const { getChatByUserId, getChatById, addChat, updateChat,  } = require("../controllers/chatController")
const { isPekerja, isPerekrut, isLogin } = require('../helpers/auth')

router.get('/chat',isLogin,  getChatByUserId)
router.get('/:chatId',isLogin,  getChatById)
router.post('/',isLogin,addChat)
router.patch('/:chatId',isLogin,updateChat)

module.exports = router