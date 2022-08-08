const Skill = require ('../models/skill');

module.exports = {
    getByIdUser: async (req, res) => {
        try {
            const userId = req.decodeToken.userId;
            const result = await Skill.getByIdUser(userId);
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
    getSkillById: async (req, res) => {
        try {
            const skill_id = req.params.skill_id;
            const result = await Skill.getSkillById(skill_id);
            if (!result.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${skill_id} not found!`, data: []
                })
            }
            return res.status(200).json({ success: true, message: 'Success', data: result[0] });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    addSkill: async (req, res) => {
        try {
            const userId = req.decodeToken.userId;
            let {skillName} = req.body
            if (!skillName) {
                return res.status(404).json({ success: false, message: `Error: Data cannot be empty. Please fill in.` })
            }
            let setData = {
                ...req.body,
                userId
            }
            const result = await Skill.addSkill(setData);
            return res.status(200).json({ success: true, message: 'Your Skill data has been added.', data: result });
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    updateSkill: async (req, res) => {
        try {
            const {skill_id} = req.params;
            const userId = req.decodeToken.userId
            const checkData = await Skill.getSkillById(skill_id);
            if(req.body.userId){
                return res.status(500).json({
                    success: false, message: `Error: Cannot transfer data. Keep it to yourself!`, data: []
                })
            }
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${skill_id} not found!`, data: []
                })
            }
            if(checkData[0].userId !== userId){
                return res.status(500).json({
                    success: false, message: `Error: Cant edit!`, data: []
                })
            }
            let setData = {
                ...req.body
            }
            const result = await Skill.updateSkill(skill_id, setData);
            return res.status(200).json({ success: true, message: 'Update data success!', data: result });
        } catch (error) {
            // console.log (error)
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        }
    },
    removeSkill: async (req, res) => {
        try {
            const skill_id = req.params.skill_id;
            const checkData = await Skill.getSkillById(skill_id);
            if (checkData[0].userId !== req.decodeToken.userId) {
                return res.status(500).json({
                    success: false, message: `Error: Sorry, access is not allowed!`, data: []
                })
            }
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${skill_id} not found!`, data: []
                })
            }
            const results = await Skill.removeSkill(skill_id);
            return res.status(200).json({ success: true, message: 'Success delete!', data: results });
        } catch (err) {
            return res.status(500).json({ success: false, message: `Error: ${err.code}` });
        }
    }
    
}