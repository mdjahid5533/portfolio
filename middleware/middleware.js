const express = require('express')
const morgan = require('morgan')
const flash = require('connect-flash')
const session = require('express-session')
const MongoDBStore = require('connect-mongodb-session')(session)
const setLocals = require('./setLocals')
const config = require('config')

const mongoDB_URI = `mongodb+srv://${config.get('db-username')}:${config.get('db-password')}@cluster0.m6dgs.mongodb.net/portfolio?retryWrites=true&w=majority`
const store = new MongoDBStore({
    uri: mongoDB_URI,
    collection: 'sessions'
})

let middleware = [
    morgan('dev'),
    express.static('public'),
    express.urlencoded({
        extended: true
    }),
    express.json(),
    session({
        secret: config.get('secret'),
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 1000 * 60 * 60 * 24
        },
        store
    }),
    setLocals(),
    flash()
]

module.exports = app => middleware.forEach(m => app.use(m))