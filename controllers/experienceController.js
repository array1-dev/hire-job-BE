const Experiences = require('../models/experience');
// const Slug = require('slugify');

module.exports = {
    getByIdUser: async (req, res) => {
        try {
            const userId = req.params.userId;
            console.log(userId)
            const result = await Experiences.getByIdUser(userId);
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
    getExperienceById: async (req, res) => {
        try {
            const experienceId = req.params.experienceId;
            const result = await Experiences.getExperienceById(experienceId);
            if (!result.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${experienceId} not found!`, data: []
                })
            }
            return res.status(200).json({ success: true, message: 'Success', data: result[0] });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    addExperience: async (req, res) => {
        try {
            let setData = {
                ...req.body
            }
            const result = await Experiences.add(setData);
            return res.status(200).json({ success: true, message: 'Success', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    updateExperience: async (req, res) => {
        try {
            const experienceId = req.params.experienceId;
            const checkData = await Experiences.getProductById(experienceId);
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${experienceId} not found!`, data: []
                })
            }
            let setData = {
                ...req.body
            }
            const result = await Experiences.update(experienceId, setData);
            return res.status(200).json({ success: true, message: 'Success update!', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    removeExperience: async (req, res) => {
        try {
            const experienceId = req.params.experienceId;
            const checkData = await Experiences.getUserById(experienceId);
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${experienceId} not found!`, data: []
                })
            }
            const results = await Users.remove(experienceId);
            return res.status(200).json({ success: true, message: 'Success delete!', data: results });
        } catch (err) {
            return res.status(500).json({ success: false, message: `Error: ${err.code}` });
        }
    }
    
}