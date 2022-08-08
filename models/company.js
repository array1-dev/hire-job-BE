const db = require('../helpers/db')

module.exports = {
    getUserId: (userId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM companies WHERE userId='${userId}'`, (error, result) => {
                if (error) {
                    reject({
                        success: false,
                        message: error.sqlMessage,
                    })
                }
                resolve(result)
            })
        })
    },
    getCompanyId: (companyId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM companies WHERE companyId='${companyId}'`, (error, result) => {
                if (error) {
                    reject({
                        success: false,
                        message: error.sqlMessage,
                    })
                }
                resolve(result)
            })
        })
    },
    addCompany: (req, res) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO companies SET ?`, req, (err, results) => {
              if (err) {
                reject({ message: "something is wrong here" })
              }
              resolve({
                message: "add company success",
                status: 200,
                data: results
              })
            })
        })
    },
    updateCompany: async (companyId, data) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE companies SET ? WHERE companyId = ?`, [data, companyId], (err, results) => {
                if (err) {
                    reject({
                        success: false, message: err.sqlMessage, data: {
                            errCode: err.code, errNo: err.errno
                        }
                    })
                }
                resolve({
                    companyId,
                    ...data,
                })
            })
        })
    },
    removeCompany: async (companyId) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM companies WHERE companyId = ?`, companyId, (err, results) => {
                if (err) {
                    reject({
                        success:false, message: err.sqlMessage, data: {
                            errCode: err.code, errNo: err.errno
                        }
                    })
                }
                resolve(results)
            })
        })
    }
}