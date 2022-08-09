const users = require('../models/users')
const notification = require('../models/notifikation')
const fs = require('fs')
const { SendbyHire } = require('../helpers/sendEmail')
const sendEmail = require('../helpers/sendEmail')

module.exports = {
    getAllNotifByrecipientId: async (req, res) => {
        try {
            let userId = req.decodeToken.userId
            const results = await notification.getAllNotifByrecipientId(userId)
            console.log(results)
            if (!results.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${userId} not found!`, data: []
                })
            }
            // if (req.decodeToken.userId !== results[) {
            //     return res.status(404).json({
            //         success: false, message: `Error: Sorry, access is not allowed!`, data: []
            //     })
            // }
            console.log(results)
            return res.status(200).json({ success: true, message: 'Success get data', data: results })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ success: false, message: `Error: Something went wrong!` })
        }
    },
    getById: async (req, res) => {
        try {
            let userId = req.decodeToken.userId
            const results = await users.getPekerjaById(userId)
            if (!results.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${userId} not found!`, data: []
                })
            }
            if (req.decodeToken.userId !== results[0].userId) {
                return res.status(404).json({
                    success: false, message: `Error: Sorry, access is not allowed!`, data: []
                })
            }
            return res.status(200).json({ success: true, message: 'Success get data', data: results })
        } catch (err) {
            return res.status(500).json({ success: false, message: `Error: Something went wrong!` })
        }
    },



    updateNotification: async (req, res) => {
        try {
            const userId = req.decodeToken.userId;
            const checkData = await notification.getAllNotifByrecipientId(userId)
            console.log(checkData)
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${userId} not found!`, data: []
                })
            }
            if (req.decodeToken.userId !== checkData[0].recipientId) {
                return res.status(404).json({
                    success: false, message: `Error: Sorry, access is not allowed!`, data: []
                })
            }
            
            const results = await notification.updatenotification(userId);

            return res.status(200).json({ success: true, message: 'Success update data', data: results })

        } catch (err) {
            console.log(err)
            return res.status(500).json({ success: false, message: `Error: Something went wrong!` });
        }

    },


}
