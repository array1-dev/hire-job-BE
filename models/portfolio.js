const db = require('../helpers/db')

module.exports = {
    getPortfolioByUserId: (userId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM portfolio WHERE userId='${userId}'`, (error, result) => {
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
     getPortfolioById: (portfolioId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM portfolio WHERE portfolioId='${portfolioId}'`, (error, result) => {
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
    addPortfolio: async (setData) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO portfolio SET ?`, setData, (err) => {
                if (err) {
                    reject({
                        success: false, message: err.sqlMessage, data: {
                            errCode: err.code, errNo: err.errno
                        }
                    })
                }
                resolve({
                    ...setData
                  })
            })
        })
    },
    updatePortfolio: async (setData, portfolioId) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE portfolio SET ? WHERE portfolioId = ?`, [setData, portfolioId], (err) => {
                if (err) {
                    reject({
                        success: false, message: err.sqlMessage, setData: {
                            errCode: err.code, errNo: err.errno
                        }
                    })
                }
                resolve({
                    portfolioId,
                    ...setData,
                })
            })
        })
    },
    deletePortfolio: async (portfolioId) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM portfolio WHERE portfolioId = ?`, portfolioId, (err, results) => {
                if (err) {
                    reject({
                        success: false, message: err.sqlMessage, data: {
                            errCode: err.code, errNo: err.errno
                        }
                    })
                }
                resolve(results)
            })
        })
    }
}