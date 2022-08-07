const express = require("express");
const app = express()
const authRoute = require('./authRoute')
const { isPekerja, isPerekrut, isLogin } = require('../helpers/auth')
const experienceRoute = require('./experienceRoute')

app.use('/auth', authRoute)
app.use('/experiences',isLogin, experienceRoute)


module.exports = app
