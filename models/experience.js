const db = require('../helpers/db')

module.exports = {
    getByIdUser: (userId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM experiences WHERE userId='${userId}'`, (error, result) => {
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
    getExperienceById: (experienceId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM experiences WHERE experienceId='${experienceId}'`, (error, result) => {
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
    addExperience: (req, res) => {
        return new Promise((resolve, reject) => {
            db.query(`INSERT INTO experiences SET ?`, req, (err, results) => {
              if (err) {
                reject({ message: "something is wrong here" })
              }
              resolve({
                message: "add experiences success",
                status: 200,
                data: results
              })
            })
        })
    },
    updateExperience: async (experienceId, data) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE experiences SET ? WHERE experienceId = ?`, [data, experienceId], (err, results) => {
                if (err) {
                    reject({
                        success: false, message: err.sqlMessage, data: {
                            errCode: err.code, errNo: err.errno
                        }
                    })
                }
                resolve({
                    experienceId,
                    ...data,
                })
            })
        })
    },
    removeExperience: async (experienceId) => {
        return new Promise((resolve, reject) => {
            db.query(`DELETE FROM experiences WHERE experienceId = ?`, experienceId, (err, results) => {
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
    }, getExperienceBySlug: (slug) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT * FROM experiences WHERE userSlug='${slug}'`, (error, result) => {
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
}