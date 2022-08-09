const Companies = require('../models/company');
const Slugify = require('slugify');

randomString = (length) => {
    let result = ''
    const characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
    const charactersLength = characters.length
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength))
    }
    return result
}

module.exports = {
    getUserId: async (req, res) => {
        try {
            const userId = req.decodeToken.userId;
            const result = await Companies.getUserId(userId);
            
            if (!result.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${userId} not found!`, data: []
                })
            }
            return res.status(200).json({ success: true, message: 'Success', data: result[0] });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    getCompanyId: async (req, res) => {
        try {
            const { companyId } = req.params;
            const result = await Companies.getCompanyId(companyId);
            if (!result.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${companyId} not found!`, data: []
                })
            }
            return res.status(200).json({ success: true, message: 'Success', data: result[0] });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    getCompanyBySlug: async (req, res) => {
        try {
            const { companySlug } = req.params;
            const result = await Companies.getCompanybySlug(companySlug);
            if (!result.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${companySlug} not found!`, data: []
                })
            }
            return res.status(200).json({ success: true, message: 'Success', data: result[0] });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    addCompany: async (req, res) => {
        try {
            const userId = req.decodeToken.userId;
            let { companyName, companyField, companyAddress, companyDescription, companyEmail, companyInstagram, companyPhone, companyLinkedin } = req.body
            const companySlug = Slugify(`${companyName} ${randomString(2)}`, { lower: true })
            if (!companyName || !companyField || !companyAddress || !companyDescription || !companyEmail || !companyInstagram || !companyPhone || !companyLinkedin) {
                return res.status(404).json({ success: false, message: `Error: Data cannot be empty. Please fill in.` })
            }
            let setData = {
                ...req.body,
                userId,
                companySlug
            }
            const result = await Companies.addCompany(setData);
            return res.status(200).json({ success: true, message: 'Your company data has been added.', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    updateCompany: async (req, res) => {
        try {
            const { companyId } = req.params;
            let { companyName } = req.body;
            const userId = req.decodeToken.userId
            const checkData = await Companies.getCompanyId(companyId);
            let companySlug;
            if(req.body.userId){
                return res.status(500).json({
                    success: false, message: `Error: Cannot transfer data. Keep it to yourself!`, data: []
                })
            }
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${companyId} not found!`, data: []
                })
            }
            if(checkData[0].userId !== userId){
                return res.status(500).json({
                    success: false, message: `Error: Cant edit!`, data: []
                })
            }
            if (req.body.companyName) {
                companySlug = Slugify(`${companyName} ${randomString(2)}`, { lower: true })
            }
            let setData = {
                ...req.body,
                companySlug
            }
            const result = await Companies.updateCompany(companyId, setData);
            return res.status(200).json({ success: true, message: 'Update data success!', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    removeCompany: async (req, res) => {
        try {
            const { companyId } = req.params;
            const checkData = await Companies.getCompanyId(companyId);
            if (checkData[0].userId !== req.decodeToken.userId) {
                return res.status(500).json({
                    success: false, message: `Error: Sorry, access is not allowed!`, data: []
                })
            }
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${companyId} not found!`, data: []
                })
            }
            const results = await Companies.removeCompany(companyId);
            return res.status(200).json({ success: true, message: 'Success delete!', data: results });
        } catch (err) {
            return res.status(500).json({ success: false, message: `Error: ${err.code}` });
        }
    }
    
}