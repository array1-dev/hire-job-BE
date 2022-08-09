const db = require('../helpers/db')

module.exports = {
    getChatByIdUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM chat WHERE userId='${userId}'`, (error, result) => {
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
    getChatById: (chatId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM chat WHERE chatId='${chatId}'`, (error, result) => {
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
    addChat: (req, res) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO chat SET ?`, req, (err, results) => {
              if (err) {
                reject({ message: "something is wrong here" })
              }
              resolve({
                message: "add chat success",
                status: 200,
                data: results
              })
            })
        })
    },
    updateChat: async (chatId) => { 
        return new Promise((resolve, reject) => {
            db.query(`UPDATE chat SET isRead='y' WHERE chatId = ?`, [chatId], (err, results) => {
                if (err) { 
                    reject({
                        success: false, message: err.sqlMessage, setData: {
                            errCode: err.code, errNo: err.errno
                        }
                    })
                }
                resolve({
                    results
                })
            })
        })
    },
}