const Experiences = require('../models/experience');
// const Slug = require('slugify');

module.exports = {
    getByIdUser: async (req, res) => {
        try {
            const userId = req.decodeToken.userId;
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
            const { experienceId } = req.params;
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
            const userId = req.decodeToken.userId;
            let { experienceName, experiencePlace, experienceIn, experienceOut, experienceDescription } = req.body
            if (!experienceName || !experiencePlace || !experienceIn || !experienceOut || !experienceDescription) {
                return res.status(404).json({ success: false, message: `Error: Data cannot be empty. Please fill in.` })
            }
            let setData = {
                ...req.body,
                userId
            }
            const result = await Experiences.addExperience(setData);
            return res.status(200).json({ success: true, message: 'Your experience data has been added.', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    updateExperience: async (req, res) => {
        try {
            const { experienceId } = req.params;
            const userId = req.decodeToken.userId
            const checkData = await Experiences.getExperienceById(experienceId);
            if (req.body.userId) {
                return res.status(500).json({
                    success: false, message: `Error: Cannot transfer data. Keep it to yourself!`, data: []
                })
            }
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${experienceId} not found!`, data: []
                })
            }
            if (checkData[0].userId !== userId) {
                return res.status(500).json({
                    success: false, message: `Error: Cant edit!`, data: []
                })
            }
            let setData = {
                ...req.body
            }
            const result = await Experiences.updateExperience(experienceId, setData);
            return res.status(200).json({ success: true, message: 'Update data success!', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    removeExperience: async (req, res) => {
        try {
            const { experienceId } = req.params;
            const checkData = await Experiences.getExperienceById(experienceId);
            if (checkData[0].userId !== req.decodeToken.userId) {
                return res.status(500).json({
                    success: false, message: `Error: Sorry, access is not allowed!`, data: []
                })
            }
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${experienceId} not found!`, data: []
                })
            }
            const results = await Experiences.removeExperience(experienceId);
            return res.status(200).json({ success: true, message: 'Success delete!', data: results });
        } catch (err) {
            return res.status(500).json({ success: false, message: `Error: ${err.code}` });
        }
    },
    getExperienceBySlug: async (req, res) => {
        try {
            const { userSlug } = req.params
            console.log(userSlug)
            const results = await Experiences.getExperienceBySlug(userSlug)
            if (!results) {
                return res.status(400).json({ success: false, message: `Error: Portfolio Empty`, data: [] })
            }
            return res.status(200).json({ success: true, message: "Success show portfolioId", data: results })
        } catch (error) {
            console.log(error)
            return res.status(400).json({ success: false, message: `Error: ${error.message}`, data: [] })
        }
    },

}