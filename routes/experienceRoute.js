const express = require("express")
const router = express.Router()
const { getByIdUser, getExperienceById, addExperience, updateExperience, removeExperience } = require("../controllers/experienceController")

router.get('/:userId', getByIdUser)
router.get('/:experienceId', getExperienceById)
router.post('/', addExperience)
router.patch('/:experienceId', updateExperience)
router.delete('/:experienceId', removeExperience)


module.exports = router