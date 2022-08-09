const express = require("express")
const router = express.Router()
const { getByIdUser, getExperienceById, addExperience, updateExperience, removeExperience,getExperienceBySlug } = require("../controllers/experienceController")
const { isPekerja, isPerekrut, isLogin } = require('../helpers/auth')

router.get('/', isLogin, getByIdUser)
router.get('/:experienceId', isLogin,isPekerja, getExperienceById)
router.get('/user/:userSlug',getExperienceBySlug)
router.post('/',isLogin, isPekerja, addExperience)
router.patch('/:experienceId',isLogin, isPekerja, updateExperience)
router.delete('/:experienceId', isLogin,isPekerja, removeExperience)


module.exports = router