const express = require("express")
const router = express.Router()
const { getByIdUser, getSkillById, addSkill, updateSkill, removeSkill } = require("../controllers/skillController")
const { isPekerja, isPerekrut, isLogin } = require('../helpers/auth')

router.get('/', isLogin, getByIdUser)
router.get('/:skill_id', isPekerja, getSkillById)
router.post('/', isPekerja, addSkill)
router.patch('/:skill_id', isPekerja, updateSkill)
router.delete('/:skill_id', isPekerja, removeSkill)


module.exports = router