const Chat = require('../models/chat')

module.exports = {
    getChatByUserId: async (req, res) => {
        try {
          const userId = req.decodeToken.userId
          const results = await Chat.getChatByIdUser(userId)
          if (!results) {
            return res.status(400).json({ success: false, message: `Error: Chat Empty`, data: [] })
          }
          return res.status(200).json({ success: true, message: "Success show ChatByUserId", data: results })
        } catch (error) {
          return res.status(400).json({ success: false, message: `Error: ${error.message}`, data: [] })
        }
      },
      getChatById: async (req, res) => {
        try {
          const { chatId } = req.params
          const results = await Chat.getChatById(chatId)
          if (!results) {
            return res.status(400).json({ success: false, message: `Error: Chat Empty`, data: [] })
          }
          return res.status(200).json({ success: true, message: "Success show ChatId", data: results })
        } catch (error) {
          return res.status(400).json({ success: false, message: `Error: ${error.message}`, data: [] })
        }
      },
      addChat: async (req, res) => { 
        try {
          let {from, to, message } = req.body
          userId =  req.decodeToken.userId
          if (!from || !to || !message) {
            return res.status(400).json({ success: false, message: `Error: Please input message`, data: [] })
          }
          const setData = {from, to, message }
          const results = await Chat.addChat(setData)
          return res.status(200).json({ success: true, message: "Success create message", data: results })
        } catch (error) { console.log(error,'manaaaaaaaaa')
          return res.status(400).json({ success: false, message: `Error: ${error.code}`, data: [] })
        } 
      },
      updateChat: async (req, res) => { 
        try {
            const { chatId } = req.params; 
            const userId = req.decodeToken.userId
            const checkData = await Chat.getChatById(chatId);
            if(req.body.userId){  
                return res.status(500).json({
                    success: false, message: `Error: Cannot transfer data. Keep it to yourself!`, data: []
                })
            }
            if (!checkData.length) {
                return res.status(404).json({
                    success: false, message: `Error: Data by ${chatId} not found!`, data: []
                })
            } 
            if(checkData[0].to !== userId){ 
                return res.status(500).json({
                    success: false, message: `Error: Cant edit!`, data: []
                })
            }
            let setData = { 
                ...req.body
            } 
            const result = await Chat.updateChat(chatId, setData);
            return res.status(200).json({ success: true, message: 'Update data success!', data: result });
        } catch (error) { 
            return res.status(500).json({ success: false, message: `Error: ${error.code}` });
        } 
    }
}