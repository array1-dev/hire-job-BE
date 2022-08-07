const { off } = require("../helpers/db")
const db = require("../helpers/db")

module.exports = {
    getUsersById : (userId) =>{
        return new Promise ((resolve,reject) =>{
            const sql = `SELECT userPhone, userFullName, email, jobdesk, address, instagram, github, gitlab, userDescription, userImage FROM users WHERE userId = ${userId} `
            db.query(sql,(err,results) =>{
                if(err){
                    reject(err)
                }
                resolve(results)
            })
        })
    },
    getUsersBySlug : (userSlug) =>{
        return new Promise ((resolve,reject) =>{
            console.log(userSlug, 'ini slug dari model')   
            const sql = `SELECT users.userSlug, users.userPhone,users.userFullName, users.jobdesk, users.address, users.userImage, users.userDescription, GROUP_CONCAT(skills.skillName) AS skiils from users JOIN skills ON users.userId = skills.userId  WHERE users.userSlug = '${userSlug}' GROUP BY users.userId`
            db.query(sql,(err,results) =>{
                console.log(results, 'ini result')

                if(err){
                    reject(err)
                }
                results.map((item, index) =>{
                    console.log(item.skiils)
                    hasil = item.skiils.split(',')
                    resolve(
                    results,
                    results[index].skiils = hasil
                )
                })
            })
        })
    },
    getAllUsers : (search, orderBy, limit, offset ) =>{
        return new Promise ((resolve, reject) =>{
            // SELECT * FROM users WHERE email LIKE '%${search}%' OR name LIKE '%${search}%' OR address LIKE '%${search}%' OR dob LIKE '%${search}%' ORDER BY userId ${orderBy} LIMIT ${limit} OFFSET ${offset}`


            const sql = `SELECT users.userSlug,users.userFullName, users.jobdesk, users.address, users.userImage, GROUP_CONCAT(skills.skillName) AS skiils from users JOIN skills ON users.userId = skills.userId ${search ?  `WHERE skills.skillname LIKE '${search}'` : ''} GROUP BY users.userId ${limit ? `LIMIT ${limit}  OFFSET ${offset}` : ''}`
            
            db.query( sql,(err,result) =>{
                console.log(result)
                if(err){
                    reject(err)
                }
                result.map((item, index) =>{
                    console.log(item.skiils)
                    hasil = item.skiils.split(',')
                    resolve(
                    result,
                    result[index].skiils = hasil
                )
                })
            })
        })
    },
    remove : (userId) =>{
        return new Promise ((resolve, reject) =>{
            db.query(`DELETE FROM users WHERE userId = ?`, userId, (err,results) =>{
                if(err){
                    reject(err)
                }
                console.log({
                    message: 'get data berhasil',
                    data: results
                })
                resolve(results)
            })
        })
    },
    update: async(userId, data) =>{
        return new Promise((resolve, reject) =>{
            db.query(`UPDATE users SET ? WHERE userId `, [data, userId], (err,results) =>{
                if(err) reject(err)
                resolve({
                    userId, 
                    ...data
                })
            })
        })
    },

    countAllUser: () =>{
        return new Promise((resolve, reject) =>{
            db.query('SELECT COUNT(userId) AS total FROM users', (err,results) =>{
                if(err) reject(err)
                resolve(results[0].total)
            })
        })
    }
}