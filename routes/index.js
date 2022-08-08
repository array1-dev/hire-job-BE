const express = require("express");
const app = express()
const authRoute = require('./authRoute')
const { isPekerja, isPerekrut, isLogin } = require('../helpers/auth')
const experienceRoute = require('./experienceRoute')
const companyRoute = require('./companyRoute')

app.use('/auth', authRoute)
app.use('/experiences', isLogin, experienceRoute)
app.use('/companies', isLogin, companyRoute)


module.exports = app
