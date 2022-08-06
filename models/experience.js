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
    // getExperience: (experienceId) => {
    //     db.query(`SELECT experienceName, experiencePlace, experienceIn, experienceOut, experienceDescription, created_at, updated_at FROM experiences WHERE experienceId='${experienceId}'`, (error, result) => {
    //         if (error) {
    //             reject({
    //                 success: false,
    //                 message: error.sqlMessage,
    //             })
    //         }
    //         resolve(result)
    //     })
    // },
    addExperience: (req, res) => {
        return new Promise((resolve, reject) => {
          const { experienceName, experiencePlace, experienceIn, experienceOut, experienceDescription } = req.body
          db.query(`INSERT INTO experiences(experienceName, experiencePlace, experienceIn, experienceOut, experienceDescription) VALUES ('${experienceName}','${experiencePlace}','${experienceIn}','${experienceOut}','${experienceDescription}')`,
            (err, results) => {
              if (err) {
                console.log(err)
                reject({ message: "ada error" })
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
    }
}