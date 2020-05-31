require('dotenv').config()
const express = require('express')
// eslint-disable-next-line node/no-extraneous-require
const bodyParser = require('body-parser')
const mongoose = require('mongoose')
const routes = require('./routes/api')
const path = require('path')
const app = express()

//* MIDDLEWARES

app.use(bodyParser.urlencoded())
app.use(express.json())
app.use(require('morgan')('combined'))

//* Public Folder
app.use(express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'frontend/build')))

//* API ROUTES
app.use('/api', routes)
app.use((error, req, res, next) => {
    console.log('Error')
    if (!error) return next() // you also need this line
    return res.status(error.status || 500).json({
        errorMessage: error.message,
    })
})
//* FRONTEND ROUTES
// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname, '/frontend/build/index.html'))
// })

mongoose
    .connect(process.env.MONGOOSE_URL, { useNewUrlParser: true })
    .then(() => console.log('Connected to db'))
    .catch((err) => console.log(err))

app.listen(process.env.PORT || 4000)
