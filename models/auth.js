const db = require('../helpers/db')

module.exports = {
    register: (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO users SET ?`, data, (error, results) => {
                if (error) {
                    reject(error)
                }
                resolve(results)
            })
        })
    },
    login: (email) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT userId, email, password, userImage, role FROM users WHERE email='${email}'`, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    getUserByEmail: (email) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT email,code FROM users WHERE email='${email}'`, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    verify: (email) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET isActive='y',code='' WHERE email='${email}'`, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    forgotPass: (email, code) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users set code='${code}' WHERE email='${email}'`, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    },
    updatePassword: (email, password) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET password = '${password}',code = '',isActive='y' WHERE email = '${email}'`, (error, result) => {
                if (error) {
                    reject(error)
                }
                resolve(result)
            })
        })
    }

}