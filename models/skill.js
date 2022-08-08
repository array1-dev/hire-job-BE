const db = require('../helpers/db')

module.exports = {
    getByIdUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM skills WHERE userId='${userId}'`, (error, result) => {
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
    getSkillById: (skill_id) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM skills WHERE skill_id='${skill_id}'`, (error, result) => {
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
    
    addSkill: (req, res) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO skills SET ?`, req, (err, results) => {
              if (err) {
                reject({ message: "ada error" })
              }
              resolve({
                message: "add skill success",
                status: 200,
                data: results
              })
            })
        })
    },
    updateSkill: async (skill_id, data) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE skills SET ? WHERE skill_id = ?`, [data, skill_id], (err, results) => {
                if (err) {
                    reject({
                        success: false, message: err.sqlMessage, data: {
                            errCode: err.code, errNo: err.errno
                        }
                    })
                }
                resolve({
                    skill_id,
                    ...data,
                })
            })
        })
    },
    removeSkill: async (skill_id) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM skills WHERE skill_id = ?`, skill_id, (err, results) => {
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