const express = require("express")
const router = express.Router()
const { getUserId, getCompanyId, addCompany, updateCompany, removeCompany, getCompanyBySlug } = require("../controllers/companyController")
const { isPekerja, isPerekrut, isLogin } = require('../helpers/auth')

router.get('/', isLogin, getUserId)
router.get('/id/:companyId', isPerekrut, getCompanyId)
router.get('/:companySlug', getCompanyBySlug)
router.post('/', isPerekrut, addCompany)
router.patch('/:companyId', isLogin, isPerekrut, updateCompany)
router.delete('/:companyId', isPerekrut, removeCompany)


module.exports = router