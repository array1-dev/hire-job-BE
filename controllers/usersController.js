const users = require('../models/users')
const Users = require('../models/users')


module.exports ={
    getAllUsers : async (req,res) =>{
        try{
            let {search = '', orderBy= 'react', limit, page} =req.query
            console.log(limit)
            limit = Number(limit) || 100
            page = Number(page) || 1
            const offset = (page - 1) * limit
            console.log(offset)
            let totalAllData = await Users.countAllUser()
            const totalPage = Math.ceil(totalAllData / limit)
            const results = await Users.getAllUsers(search, orderBy, limit, offset)
            const totalRows = results.length
            if(page > totalPage){
                return res.status(400).json({success: false, message: 'Error: Page not found', data:[]})
            }
            return res.status(200).json({success: true, message: "success show all users", data: {totalAllData, totalRows, totalPage, results}})

        }catch(err){
            return res.status(500).json({success: false, message: `Error: ${err.code}`})
        }
    },
    getBySlug : async (req,res) =>{
        try{
            let userSlug = req.params.userSlug
            console.log(userSlug)
            const results = await Users.getUsersBySlug(userSlug)
            return res.status(200).json({success: true, message: `success data users ${userSlug}`, data: {results}})

        }catch(err){
            return res.status(500).json({success: false, message: `Error: ${err.code}`})
        }
    },
    updateUsers: async (req,res) =>{
        try{
            console.log(req.headers.authorization)
            console.log(req.body , 'ini req body')
            const userId = req.decodeToken.userId;
            console.log(userId, 'user id update')
            const checkData = await users.getUsersById(userId)
            console.log(checkData)
            if(!checkData.length){
                return res.status(404).json({
                    success: false, message: `Error: Data by ${userId} not found!`, data : []
                })
            }
            let {userImage} = req.file ? req.file.path[0] : checkData[0].userImage
            let setData = {
                ...req.body, userImage
            }
            console.log(setData , 'ini set data')
            if (req.body.password) {
                return res.status(400).json({ success: false, message: 'Error: Password cannot be updated' })
            }
            const results = await Users.update(userId, setData);
            return res.status(200).json({ success: true, message: 'Success update data', data: results });
        }catch(err){
            return res.status(500).json({ success: false, message: `Error: ${err.code}` });
        }

    }
}
