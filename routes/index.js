const express = require("express");
const app = express()
const authRoute = require('./authRoute')
const { isPekerja, isPerekrut, isLogin } = require('../helpers/auth')
const portfolioRoute = require('./portfolioRoute')

app.use('/auth', authRoute)
app.use('/portfolio', portfolioRoute)


module.exports = app
