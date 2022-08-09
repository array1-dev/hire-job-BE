const express = require("express")
const router = express.Router()
const {getAllNotifByrecipientId,updateNotification} = require('../controllers/notificationController')
const { isPekerja, isPerekrut, isLogin } = require('../helpers/auth')


router.get('/', isLogin,getAllNotifByrecipientId )
// router.post('/', isPekerja, addExperience)
router.patch('/', isLogin, updateNotification )
// router.delete('/:experienceI d', isPekerja, removeExperience)


module.exports = router