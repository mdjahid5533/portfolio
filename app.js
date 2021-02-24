require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
//const config = require('config')

// import all middleware and router
const middleware = require('./middleware/middleware')
const router = require('./routers/routes')

// Database(mongoDB) URI
const mongoDB_URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@cluster0.m6dgs.mongodb.net/portfolio?retryWrites=true&w=majority`

const app = express()

// Setup View Engine
app.set('view engine', 'ejs')
app.set('views', 'views')

// Called import Middleware and router
middleware(app)
router(app)

// Error Handling Middleware
app.use((req, res, next) => {
    let error = new Error('404 page not found')
    error.status = 404
    next(error)
})
app.use((error, req, res, next) => {
    if (error.status === 404) {
        return res.render('404/404', {
            title: '404 | Portfolio',
            path: '',
            flashMasg: {}
        })
    }

    console.log(error);
    res.render('404/500', {
        title: `Internal Server Error | Portfolio`,
        path: '',
        flashMasg: {}
    })
})

// Applicaiton PORT Name
const PORT = process.env.PORT || 8080

// Connect mongoDB URI with Application
mongoose.connect(mongoDB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then(() => {
        app.listen(PORT, () => {
            console.log('Server is Connect...');
        })
    })
    .catch(err => {
        next(err)
    });