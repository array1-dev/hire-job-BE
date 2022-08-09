const express = require("express")
const router = express.Router()
const {  getPortfolioByUserId , getPortfolioById, addPortfolio, updatePortfolio, deletePortfolio,getPortfolioBySlug } = require("../controllers/portfolioController")
const { isPekerja, isPerekrut, isLogin } = require('../helpers/auth')
const upload = require("../helpers/portfolioImage")

router.get('/user',isLogin,  getPortfolioByUserId)
router.get('/user/:userSlug',  getPortfolioBySlug)
router.get('/:portfolioId',isLogin,  getPortfolioById)
router.post('/user',isLogin, upload, addPortfolio)
router.patch('/:portfolioId',isLogin,upload, updatePortfolio)
router.delete('/:portfolioId',isLogin, deletePortfolio)

module.exports = router
