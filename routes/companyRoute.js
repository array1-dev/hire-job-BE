const express = require("express")
const router = express.Router()
const { getUserId, getCompanyId, addCompany, updateCompany, removeCompany } = require("../controllers/companyController")
const { isPekerja, isPerekrut, isLogin } = require('../helpers/auth')

router.get('/', isLogin, getUserId)
router.get('/:companyId', isPerekrut, getCompanyId)
router.post('/', isPerekrut, addCompany)
router.patch('/:companyId', isPerekrut, updateCompany)
router.delete('/:companyId', isPerekrut, removeCompany)


module.exports = router