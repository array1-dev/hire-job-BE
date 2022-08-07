const express = require("express")
const router = express.Router()
const { getByIdUser, getExperienceById, addExperience, updateExperience, removeExperience } = require("../controllers/experienceController")
const { isPekerja, isPerekrut, isLogin } = require('../helpers/auth')

router.get('/', isLogin, getByIdUser)
router.get('/:experienceId', isPekerja, getExperienceById)
router.post('/', isPekerja, addExperience)
router.patch('/:experienceId', isPekerja, updateExperience)
router.delete('/:experienceId', isPekerja, removeExperience)


module.exports = router