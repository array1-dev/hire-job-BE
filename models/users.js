const { off } = require("../helpers/db")
const db = require("../helpers/db")

module.exports = {
    getPekerjaById: (userId) => {
        return new Promise((resolve, reject) => {
            // console.log(userId, 'ini slug dari model')   
            const sql = `SELECT users.userId, users.categories, users.userSlug, users.userPhone,users.userFullName, users.jobdesk, users.address, users.userImage, users.userDescription, GROUP_CONCAT(skills.skillName) AS skiils from users JOIN skills ON users.userId = skills.userId  WHERE users.userId = '${userId}' GROUP BY users.userId`
            db.query(sql, (err, results) => {
                if (err) {
                    reject(err)
                }
                resolve(results)
            })
        })
    },
    getPerekrutById: (userId) => {
        return new Promise((resolve, reject) => {
            // console.log(userId, 'ini slug dari model')   
            const sql = ` SELECT users.userId, users.categories, users.userImage,companies.companyName, companies.companyField, companies.companyAddress, companies.companyDescription, companies.companyEmail, companies.companyinstagram, companies.companyPhone, companies.companyPhone, companies.companyLinkedin FROM users JOIN companies ON users.userId = companies.userId WHERE users.userId = ${userId}`
            db.query(sql, (err, results) => {
                // console.log(results, 'ini result')
                if (err) {
                    reject(err)
                }
                resolve(results)
            })
        })
    },
    getUserBySlug: (userSlug) => {
        return new Promise((resolve, reject) => {
            // console.log(userSlug, 'ini slug dari model')   
            const sql = `SELECT users.userSlug, users.email, users.categories, users.userPhone,users.userFullName, users.jobdesk, users.address, users.userImage, users.userDescription,users.instagram, users.github, users.gitlab,   GROUP_CONCAT(skills.skillName) AS skiils from users JOIN skills ON users.userId = skills.userId  WHERE users.userSlug = '${userSlug}' GROUP BY users.userId`
            db.query(sql, (err, results) => {
                // console.log(results, 'ini result')
                if (err) {
                    reject(err)
                }
                results.map((item, index) => {
                    // console.log(item.skiils)
                    hasil = item.skiils.split(',')
                    resolve(
                        results,
                        results[index].skiils = hasil
                    )
                })
            })
        })
    },
    getAllUsers: (search, sort, limit, offset, isActive) => {
        return new Promise((resolve, reject) => {
            const sql = `SELECT users.userSlug,users.userFullName,users.categories, users.jobdesk, users.address, users.userImage, users.categories, users.isActive, GROUP_CONCAT(skills.skillName) AS skills from users LEFT JOIN skills ON users.userId = skills.userId  ${search ? `WHERE skills.skillname LIKE '%${search}%' AND users.isActive = '${isActive}' OR users.userFullName LIKE '%${search}%' AND users.isActive = '${isActive}' OR users.address LIKE '%${search}%'  AND users.isActive = '${isActive}' ` :  ` WHERE users.isActive = '${isActive}'`}  ${sort === 'part time' ? `WHERE users.categories = 'part time'AND users.isActive = '${isActive}' GROUP BY users.userId ` : sort === 'fulltime' ? `WHERE users.categories = 'fulltime' AND users.isActive = '${isActive}' GROUP BY users.userId` :sort === 'freelance' ? `WHERE users.categories = 'freelance' AND users.isActive = '${isActive}' GROUP BY users.userId` : sort === 'skill' ? `WHERE skills.skillname != 'null' AND users.isActive = '${isActive}' GROUP BY users.userId ` : 'GROUP BY users.userId'}   ${limit ? `LIMIT ${limit} OFFSET ${offset}` : ''} `
            // console.log(sql)
            db.query(sql, (err, result) => {
                if (err) {
                    // console.log(err, 'ini error result')
                }
                console.log(result)
                if (!result.length) {
                    resolve([])
                }
                else {

                    result.map((item, index) => {
                        if (item.skills) {
                            hasil = item.skills.split(',')
                        }
                        if (item.skills == null) {
                            hasil = null
                        }
                        result[index].skills = hasil

                        // console.log(result[index].skills)
                        resolve(
                            result,
                            result[index].skills = hasil
                        )
                    })

                }
            })
        })
    },
    update: async (userId, data) => {
        return new Promise((resolve, reject) => {
            db.query(`UPDATE users SET  ? WHERE userId = ? `, [data, userId], (err, results) => {
                if (err) reject(err)
                resolve({
                    userId,
                    ...data
                })
            })
        })
    },
    getUserByid: (userId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT userFullName,email,users.categories,userImage,role,isActive FROM users WHERE userId= ?`, userId, (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        })
    },


    countAllUser: () => {
        return new Promise((resolve, reject) => {
            db.query('SELECT COUNT(userId) AS total FROM users', (err, results) => {
                if (err) reject(err)
                resolve(results[0].total)
            })
        })
    },
    getDataUserBySlug: (slug) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT userId,email, categories, userFullName FROM users WHERE userSlug= '${slug}'`, (err, results) => {
                if (err) reject(err)
                resolve(results)
            })
        })

    },    
    getSlugUserById: (userId) => {
        return new Promise((resolve, reject) => {
            db.query(`SELECT userSlug FROM users WHERE userId= ?`, userId, (err, res) => {
                if (err) reject(err)
                resolve(res)
            })
        })
    },

}  
