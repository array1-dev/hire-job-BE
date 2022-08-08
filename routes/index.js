const express = require("express");
const app = express()
const authRoute = require('./authRoute')
const { isPekerja, isPerekrut, isLogin } = require('../helpers/auth')
const experienceRoute = require('./experienceRoute')
const skillRoute = require ('./skillRoute')

app.use('/auth', authRoute)
app.use('/experiences',isLogin, experienceRoute)
app.use('/skills',isLogin,skillRoute )


module.exports = app
