const express = require("express");
const app = express()
const authRoute = require('./authRoute')
const { isPekerja, isPerekru, isLogin } = require('../helpers/auth')

app.use('/auth', authRoute)


module.exports = app
