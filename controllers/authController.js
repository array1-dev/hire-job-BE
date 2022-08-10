require('dotenv').config()
const jwt = require('jsonwebtoken');
const CryptoJS = require("crypto-js");
const Auth = require('../models/auth');
const sendEmail = require('../helpers/sendEmail');
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
    register: async (req, res) => {
        try {
            const { type } = req.body
            code = randomString(20)
            let { userFullName, email, password, confrimPassword, userPhone } = req.body
            email = email.toLowerCase()
            if (password.length < 8) {
                return res.status(404).json({ success: false, message: "Error: Password must be more than 8 characters" })
            }
            if (password !== confrimPassword) {
                return res.status(400).json({ success: false, message: 'Error: New Password and Confrim Password must be same' })
            }
            if (!email || !password || !userPhone || !userFullName || !confrimPassword) {
                return res.status(404).json({ success: false, message: "Error: Fields must be filled" })
            }
            const checkEmail = await Auth.getUserByEmail(email)
            if (checkEmail.length != 0) {
                return res.status(500).json({ success: false, message: 'Error: Email already registered' })
            }
            const hash = CryptoJS.AES.encrypt(password, process.env.SECRET_KEY_CRYPT).toString()
            password = hash
            if (type === 'pekerja') {
                const userSlug = Slugify(`${userFullName} ${randomString(2)}`, { lower: true })
                const role = 'pekerja'
                let setData = {
                    userFullName,
                    userSlug,
                    email,
                    password,
                    userPhone,
                    code,
                    role,
                }
                const sendemail = await sendEmail.SendEmail(email, code)
                if (sendemail) {
                    const result = await Auth.register(setData)
                    return res.status(201).json({ success: true, message: 'Successfully Register, Check your email to verify your account!', data: result })
                }
                else {
                    return res.status(500).json({ success: false, message: 'Error!, email not sent', data: [] })
                }
            }
            if (type === 'perekrut') {
                let { companyName, companyField } = req.body
                const role = 'perekrut'
                let setData = {
                    userFullName,
                    email,
                    password,
                    userPhone,
                    code,
                    role,
                }
                const sendemail = await sendEmail.SendEmail(email, code)
                if (sendemail) {
                    const result = await Auth.register(setData)
                    const checkId = await Auth.getUserByEmail(email)
                    let setDataCompany = {
                        userId: checkId[0].userId,
                        companyPhone: userPhone,
                        companyName,
                        companyField,
                    }
                    if (!checkId.length) {
                        return res.status(500).json({ success: false, message: 'Error!, register failed', data: [] })
                    }
                    await Auth.addToCompany(setDataCompany)
                    return res.status(201).json({ success: true, message: 'Successfully Register, Check your email to verify your account!', data: result })
                }
                else {
                    return res.status(500).json({ success: false, message: 'Error!, email not sent', data: [] })
                }

            }

        } catch (error) {
            console.log(error);
            if (error.code == 'ER_DUP_ENTRY') {
                return res.status(400).json({ success: false, message: 'Error: Email already registered' })
            }
            return res.status(500).json({ success: false, message: `Error: Something went wrong!` })
        }

    },
    login: async (req, res) => {
        try {
            let { email, password } = req.body
            email = email.toLowerCase()
            if (!email || !password) {
                return res.status(404).json({ success: false, message: "Error: Fields must be filled" })
            }
            const result = await Auth.login(email)
            if (result.length < 1) {
                return res.status(404).json({ success: false, message: 'Error: Wrong Email / Password' })
            }
            if (password < 8) {
                return res.status(404).json({ success: false, message: 'Error: Password must be more than 8 characters' })
            }
            const hash = CryptoJS.AES.decrypt(result[0].password, process.env.SECRET_KEY_CRYPT).toString(CryptoJS.enc.Utf8)
            if (password !== hash) {
                return res.status(404).json({ success: false, message: 'Error: Wrong Email / Password' })
            }
            const token = jwt.sign({ userId: result[0].userId, role: result[0].role, email: result[0].email }, process.env.SECRET_KEY_JWT, {
                expiresIn: '1 day'
            })
            return res.status(200).json({
                success: true,
                message: 'Success login', data: {
                    token,
                }
            })
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: Something went wrong!`, data: [] })
        }
    },
    verify: async (req, res) => {
        try {
            let { email, code } = req.body
            email = email.toLowerCase()
            const checkEmail = await Auth.getUserByEmail(email)
            if (checkEmail.length == 0) {
                return res.status(404).json({ success: false, message: 'Error: Email not found' })
            }
            if (checkEmail[0].code != code) {
                return res.status(400).json({ success: false, message: 'Wrong activation url!' })
            }
            await Auth.verify(email)
            return res.status(200).json({ success: true, message: 'Successfully verified!' })
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: Something went wrong!` })
        }
    },
    forgotPass: async (req, res) => {
        try {
            let { email } = req.body
            email = email.toLowerCase()
            code = randomString(20)
            const checkEmail = await Auth.getUserByEmail(email)
            if (checkEmail.length < 1) {
                return res.status(404).json({ success: false, message: 'Error: Email not found' })
            }
            const sendemail = await sendEmail.forgotPass(email, code)
            if (sendemail) {
                await Auth.forgotPass(email, code)
                return res.status(201).json({ success: true, message: 'Successfully sent reset-password!, Please check your email !' })
            }
            return res.status(200).json({ data: result })
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: Something went wrong!` })
        }
    },
    changePassword: async (req, res) => {
        try {
            const { email, code } = req.body
            const checkEmail = await Auth.getUserByEmail(email)
            if (checkEmail.length < 1) {
                return res.status(404).json({
                    success: false, message: 'Error: Email not found!'
                })
            }
            if (checkEmail[0].code != code) {
                return res.status(400).json({ success: false, message: 'Wrong activation url!' })
            }
            let { newPassword, confrimPassword } = req.body
            if (newPassword.length < 8) {
                return res.status(404).json({ success: false, message: 'Error: Password must be more than 8 characters' })
            }
            if (newPassword !== confrimPassword) {
                return res.status(400).json({ success: false, message: 'Error: New Password and Confrim Password must be same' })
            }
            const password = CryptoJS.AES.encrypt(newPassword, process.env.SECRET_KEY_CRYPT).toString();
            await Auth.updatePassword(email, password)
            await Auth.verify(email)
            return res.status(200).json({ success: true, message: 'Successfully change password!' })
        } catch (error) {
            return res.status(500).json({ success: false, message: `Error: Something went wrong!` })
        }
    },
    verifyCode: async (req, res) => {
        try {
            const { email, code } = req.body
            const checkEmail = await Auth.getUserByEmail(email)
            if (checkEmail.length < 1) {
                return res.status(404).json({ success: false, message: 'Email not found' })
            }
            if (checkEmail[0].code != code) {
                return res.status(400).json({ success: false, message: 'Wrong activation url!' })
            }
            return res.status(200).json({ success: true, message: 'Successfully verified!' })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }
    ,
    verifyToken: async (req, res) => {
        try {
            const token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.SECRET_KEY_JWT)
            return res.status(200).json({ success: true, message: 'Successfully verified!', data: decoded })
        } catch (error) {
            return res.status(500).json({ success: false, message: error.message })
        }
    }


}