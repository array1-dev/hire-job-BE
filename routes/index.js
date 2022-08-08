const express = require("express");
const app = express()
const authRoute = require('./authRoute')
const { isPekerja, isPerekrut, isLogin } = require('../helpers/auth')
const portfolioRoute = require('./portfolioRoute')
const experienceRoute = require('./experienceRoute')

app.use('/auth', authRoute)
app.use('/portfolio', portfolioRoute)
app.use('/experiences',isLogin, experienceRoute)


module.exports = app
