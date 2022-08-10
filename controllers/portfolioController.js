const fs= require('fs')
const Portfolio = require('../models/portfolio')
const Users = require('../models/users')
module.exports = {
    getPortfolioByUserId: async (req, res) => {
        try {
          const userId = req.decodeToken.userId
          const results = await Portfolio.getPortfolioByUserId(userId)
          if (!results) {
            return res.status(400).json({ success: false, message: `Error: Portfolio Empty`, data: [] })
          }
          return res.status(200).json({ success: true, message: "Success show PortfolioByUserId", data: results })
        } catch (error) {
          return res.status(400).json({ success: false, message: `Error: ${error.message}`, data: [] })
        }
      },
      getPortfolioById: async (req, res) => {
        try {
          const { portfolioId } = req.params
          const results = await Portfolio.getPortfolioById(portfolioId)
          if (!results) {
            return res.status(400).json({ success: false, message: `Error: Portfolio Empty`, data: [] })
          }
          return res.status(200).json({ success: true, message: "Success show portfolioId", data: results })
        } catch (error) {
          return res.status(400).json({ success: false, message: `Error: ${error.message}`, data: [] })
        }
      },
      getPortfolioBySlug: async (req, res) => {
        try {
          const { userSlug } = req.params
          console.log(userSlug)
          const results = await Portfolio.getPortfolioBySlug(userSlug)
          if (!results) {
            return res.status(400).json({ success: false, message: `Error: Portfolio Empty`, data: [] })
          }
          return res.status(200).json({ success: true, message: "Success show portfolioId", data: results })
        } catch (error) {
          return res.status(400).json({ success: false, message: `Error: ${error.message}`, data: [] })
        }
      },
    addPortfolio: async (req, res) => { 
        try {
          let {portfolioName, portfolioRepo, portfolioImage } = req.body
          portfolioImage = req.file ? req.file.filename : ''
          userId =  req.decodeToken.userId
          const getSlug = await Users.getSlugUserById(userId)
          console.log(getSlug)
          if (!portfolioName || !portfolioRepo || !portfolioImage) {
            return res.status(400).json({ success: false, message: `Error: Please input portfolio`, data: [] })
          }
          const setData = { userId, userSlug : getSlug[0].userSlug  ,portfolioName, portfolioRepo, portfolioImage }
          const results = await Portfolio.addPortfolio(setData)
          return res.status(200).json({ success: true, message: "Success create portfolio", data: results })
        } catch (error) {
          return res.status(400).json({ success: false, message: `Error: ${error.code}`, data: [] })
        }
      },
    updatePortfolio: async (req, res) => {
        try {
            const {portfolioId} = req.params;
            const userId = req.decodeToken.userId
            const checkData = await Portfolio.getPortfolioById(portfolioId);
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${portfolioId} not found!`, data: []
                })
            } 
            if (checkData[0].userId !== userId){
              return res.status(500).json({
                success: false, message: `Error : can't not Accsess`, data:[]
              }) 
            }
            let { portfolioName, portfolioRepo,portfolioImage } = req.body;
            portfolioImage = req.file ? req.file.filename : checkData[0].portfolioImage;
            if (!portfolioName && !portfolioRepo && portfolioImage === newsCheck[0].portfolioImage) {
              return res.status(400).json({ success: false, message: `Error: Nothing updated`, data: [] })
            }
            let setData = {
                ...req.body, portfolioImage
            }
            if (checkData[0].portfolioImage !== setData.portfolioImage) {
              fs.unlink(`uploads/${checkData[0].portfolioImage}`, (err) => {
                if (err) {
                  return res.status(400).json({ success: false, message: `Error: Error delete file`, data: [] })
                }
              })
            }
            const result = await Portfolio.updatePortfolio(setData, portfolioId);
            return res.status(200).json({ success: true, message: 'Success update!', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    }, 
    deletePortfolio: async (req, res) => {
        try {
            const { portfolioId } = req.params;
            const checkData = await Portfolio.getPortfolioById(portfolioId);
            if(checkData[0].userId !== req.decodeToken.userId){
              return res.status(500).json({
                success: false, message:` error: Access not allowed `, data:[]
              })
            }
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${portfolioId} not found!`, data: []
                })
            }
            fs.unlink(`uploads/${checkData[0].portfolioImage}`, (err) => {
              if (err) {
                return res.status(400).json({ success: false, message: `Error: Error delete file`, data: [] })
              }
            })
            const result = await Portfolio.deletePortfolio(portfolioId);
            return res.status(200).json({ success: true, message: 'Success delete!', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    }
}