const express = require("express");
const app = express()
const experienceRoute = require('./experienceRoute')

app.use('/experiences', experienceRoute)

module.exports = app