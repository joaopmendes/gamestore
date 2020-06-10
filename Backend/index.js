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
app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.static(path.join(__dirname, 'frontend')))

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
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '/frontend/index.html'))
})

mongoose
    .connect(process.env.MONGOOSE_URL, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true,
    })
    .then(async (db) => {
        let superAdmin = await db
            .model('user')
            .findOne({ email: process.env.SUPER_USER_EMAIL })
            .exec()
        if (!superAdmin) {
            superAdmin = require('./Services/UserService/UserServices').createUser(
                'admin',
                process.env.SUPER_USER_EMAIL,
                process.env.SUPER_USER_PASSWORD
            )
        }
        superAdmin.admin = true
        await superAdmin.save()

        console.log('Connected to db')
    })
    .catch((err) => console.log(err))

app.listen(process.env.PORT || 4000)
