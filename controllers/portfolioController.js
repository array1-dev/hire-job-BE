const fs= require('fs')
// const Slug = require('slugify');
const Portfolio = require('../models/portfolio');


module.exports = {
    getPortfolioByUserId: async (req, res) => {
        try {
          const userId = req.decodeToken.userId
          // console.log(req.decodeToken,"test user id")
          const results = await Portfolio.getPortfolioByUserId(userId)
          if (!results) {
            return res.status(400).json({ success: false, message: `Error: Portfolio Empty`, data: [] })
          }
          return res.status(200).json({ success: true, message: "Success show PortfolioByUserId", data: results })
    
        } catch (error) {
          return res.status(400).json({ success: false, message: `Error: ${error.message}`, data: [] })
        }
      },//done
      getPortfolioById: async (req, res) => {
        try {
          const { portfolioId } = req.params
          console.log(req.params,"test portfolio id")
          const results = await Portfolio.getPortfolioById(portfolioId)
          if (!results) {
            return res.status(400).json({ success: false, message: `Error: Portfolio Empty`, data: [] })
          }
          return res.status(200).json({ success: true, message: "Success show portfolioId", data: results })
    
        } catch (error) {
          return res.status(400).json({ success: false, message: `Error: ${error.message}`, data: [] })
        }
      },//done 
    addPortfolio: async (req, res) => { 
        try {
          let { userId,  portfolioName, portfolioRepo, portfolioImage } = req.body
          // console.log(req.body,'data add')
          portfolioImage = req.file ? req.file.filename : ''
          userId =  req.decodeToken.userId
          if (!portfolioName || !portfolioRepo || !portfolioImage) {
            return res.status(400).json({ success: false, message: `Error: Please input portfolio`, data: [] })
          }
          const setData = { userId,  portfolioName, portfolioRepo, portfolioImage }
          const results = await Portfolio.addPortfolio(setData)
          return res.status(200).json({ success: true, message: "Success create portfolio", data: results })
    
        } catch (error) {
          return res.status(400).json({ success: false, message: `Error: ${error.code}`, data: [] })
        }
      },//done 
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
            // console.log(req.body, 'kosongg whyyyyyyyyy')
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
    },//done 
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
          // console.log(error,'testt')
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    }
}