const db = require("../helpers/db")

module.exports = {
    getAllNotifByrecipientId : (userId) =>{
        return new Promise ((resolve,reject) =>{
            const sql = `SELECT notification_id,recipientId,senderId,notificationMessage FROM notification WHERE recipientId = ${userId}  AND isRead = 'n'`
            db.query(sql,(err,results) =>{
                if(err){
                    reject(err)
                }
                resolve(results)
            })
        })
    },

    addNotification: async (data) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO notification SET ?`, data, (err, results) => {
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
    },   
    updatenotification: async (userId) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE notification SET isRead='y' WHERE recipientId = ${userId}`,  (err, results) => {
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
    },

    getCompanyName: async (userId) =>{
        return new Promise((resolve, reject) => {
            db.query(`SELECT companyName FROM companies WHERE userId = ? `, userId, (err, results) => {
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