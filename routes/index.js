const express = require("express");
const app = express()
const authRoute = require('./authRoute')
const { isPekerja, isPerekrut, isLogin } = require('../helpers/auth')
const portfolioRoute = require('./portfolioRoute')
const experienceRoute = require('./experienceRoute')
const companyRoute = require('./companyRoute')
const skillRoute = require ('./skillRoute')

app.use('/auth', authRoute)
app.use('/experiences', isLogin, experienceRoute)
app.use('/portfolio', portfolioRoute)
app.use('/companies', companyRoute)
app.use('/skills',isLogin,skillRoute )


module.exports = app
