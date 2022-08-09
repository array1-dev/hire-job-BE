const Users = require('../models/users')
const notification = require('../models/notifikation')
const fs = require('fs')
const { isReadable } = require('stream')
const { SendbyHire } = require('../helpers/sendEmail')
const sendEmail = require('../helpers/sendEmail')
module.exports = {
    getAllUsers: async (req, res) => {
        try {
            let { search = '', sort = '', limit, page, isActive } = req.query
            // console.log(limit)

            limit = Number(limit) || 100
            page = Number(page) || 1
            const offset = (page - 1) * limit
            // console.log(offset)
            let totalAllData = await Users.countAllUser()
            const totalPage = Math.ceil(totalAllData / limit)
            const results = await Users.getAllUsers(search, sort, limit, offset, isActive)
            const totalRows = results.length
            if (page > totalPage) {
                return res.status(400).json({ success: false, message: 'Error: Page not found', data: [] })
            }
            return res.status(200).json({ success: true, message: "success show all users", data: { totalAllData, totalRows, totalPage, results } })

        } catch (err) {
            console.log(err)
            return res.status(500).json({ success: false, message: `Error: Something went wrong!` })
        }
    },
    getBySlug: async (req, res) => {
        try {
            let userSlug = req.params.userSlug
            const results = await Users.getUserBySlug(userSlug)
            if (!results.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${userSlug} not found!`, data: []
                })
            }
            return res.status(200).json({ success: true, message: `success data users ${userSlug}`, data: { results } })
        } catch (err) {
            console.log(err)
            return res.status(500).json({ success: false, message: `Error: Something went wrong!` })
        }
    },
    getUserId: async (req, res) => {
        try {
            const userId = req.decodeToken.userId
            const result = await Users.getUserByid(userId)
            if (!result.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${userId} not found!`, data: []
                })
            }
            return res.status(200).json({
                success: true, message: `Success get data!`, data: result
            })
        } catch (error) {
            // console.log(error)
            return res.status(500).json({ success: false, message: `Error: Something went wrong!` })
        }
    },
    postHire: async (req, res) => {
        try {
            const subject = req.body.tujuanPesan;
            const message = req.body.message
            const slug = req.params.userSlug
            const userId = req.decodeToken.userId
            let recepientEmail;
            let notifEmail;
            const senderData = await Users.getUserByid(userId)
            const receiveData = await Users.getDataUserBySlug(slug)
            const companyName = await notification.getCompanyName(userId)
            console.log(companyName, 'ini company name')
            console.log(senderData, 'ini sender email')
            console.log(receiveData, 'ini receive data')
            if (!receiveData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${userId} not found!`, data: []
                })
            }
            recepientEmail = receiveData[0].email

            const sendEmail = await SendbyHire(recepientEmail, subject, message)
            

            if(sendEmail === true){
                 const data = {
                    recipientId : receiveData[0].userId,
                    senderId: userId,
                    notificationMessage: ` ${companyName[0].companyName} mengirim email, silahkan cek email!  `

                 }
                 notifEmail = await notification.addNotification(data)
            }
            return res.status(200).json({ success: true, message: `Success send email to ${receiveData[0].userFullName}`, data: notifEmail})
        } catch (error) {
            console.log(error)
            return res.status(500).json({ success: false, message: `Error: Something went wrong!` })
        }
    }
    ,
    getById: async (req, res) => {
        try {
            let userId = req.decodeToken.userId
            const results = await Users.getPekerjaById(userId)
            // console.log(results ,'ini results')
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



    updateUsers: async (req, res) => {
        try {
            const userId = req.decodeToken.userId;
            const checkData = await Users.getPekerjaById(userId)
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${userId} not found!`, data: []
                })
            }
            if (req.decodeToken.userId !== checkData[0].userId) {
                return res.status(404).json({
                    success: false, message: `Error: Sorry, access is not allowed!`, data: []
                })
            }
            let userImage = req.file ? req.file.filename : checkData[0].userImage
            let setData = {
                ...req.body,
                userImage
            }

            if (req.body.password) {
                return res.status(400).json({ success: false, message: 'Error: Password cannot be updated' })
            }
            const results = await Users.update(userId, setData);
            if (req.file) {
                if (checkData[0].userImage != '') {
                    fs.unlink(`./uploads/${checkData[0].userImage}`, function (err) {
                        if (err) {
                            console.log(err)
                        }
                    })
                }
            }
            return res.status(200).json({ success: true, message: 'Success update data', data: results })

        } catch (err) {
            console.log(err)
            return res.status(500).json({ success: false, message: `Error: Something went wrong!` });
        }
    },


}
