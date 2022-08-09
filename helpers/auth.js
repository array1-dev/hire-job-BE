const jwt = require('jsonwebtoken')

module.exports = {
    isLogin: (req, res, next) => {
        if (req.headers.authorization) {
            // console.log(req.headers.authorization)
            let token = req.headers.authorization.split(' ')[1]
            jwt.verify(token, process.env.SECRET_KEY_JWT, function (err, result) {
                if (err) {
                    return res.status(403).json({ success: false, message: 'Access Forbidden' })
                }
                req.decodeToken = result
                next()
            })
        } else {
            return res.status(403).json({ success: false, message: 'Please Login' })
        }

    },
    isPekerja: (req, res, next) => {
        if (req.decodeToken.role !== 'pekerja') {
            return res.status(403).json({ success: false, message: 'Access Forbidden, Only admin can do this feature!' })
        }
        next()
    },
    isPerekrut: (req, res, next) => {
        if (req.decodeToken.role !== 'perekrut') {
            return res.status(403).json({ success: false, message: 'Access Forbidden' })
        }
        next()
    },

}