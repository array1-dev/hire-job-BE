const express = require("express");
const app = express()
const authRoute = require('./authRoute')
const usersRoute = require('./usersRoute')
const { isPekerja, isPerekrut, isLogin } = require('../helpers/auth')
const portfolioRoute = require('./portfolioRoute')
const experienceRoute = require('./experienceRoute')
const companyRoute = require('./companyRoute')
const skillRoute = require ('./skillRoute')
const notificationRoute = require('./notificationRoute')

app.use('/auth', authRoute)
app.use('/experiences', isLogin, experienceRoute)
app.use('/users', usersRoute)
app.use('/auth', authRoute)
app.use('/portfolio', portfolioRoute)
app.use('/companies', companyRoute)
app.use('/skills',isLogin,skillRoute )
app.use('/notification', isLogin, notificationRoute)



module.exports = app
