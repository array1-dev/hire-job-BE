const express = require("express");
const app = express()
const authRoute = require('./authRoute')
const usersRoute = require('./usersRoute')
const { isPekerja, isPerekru, isLogin } = require('../helpers/auth')

app.use('/auth', authRoute)
app.use('/users', usersRoute)


module.exports = app
