const crudRoutes = require('../routers/crudRoutes')
const authenticationRoutes = require('../routers/AuthenticationRoutes')
const formRoutes = require('../routers/formRoutes')
const queryRoutes = require('../routers/queryRoutes')
const resumeRoutes = require('../routers/rusumeRoutes')
const aboutRoutes = require('./aboutRoutes')
const contactRoutes = require('./contactRoutes')
const searchRoutes = require('./searchRoutes')

const Flash = require('../utils/Flash')

let routers = [{
        path: '/contact',
        controller: contactRoutes
    },
    {
        path: '/search',
        controller: searchRoutes
    },
    {
        path: '/project/query',
        controller: queryRoutes
    },
    {
        path: '/project',
        controller: formRoutes
    },
    {
        path: '/project/auth',
        controller: authenticationRoutes
    },
    {
        path: '/project/crud',
        controller: crudRoutes
    },
    {
        path: '/resume',
        controller: resumeRoutes
    },
    {
        path: '/about',
        controller: aboutRoutes
    },
    {
        path: '/',
        controller: (req, res, next) => {
            // render Root Routes
            res.render('page/Index', {
                title: 'Home Page',
                path: '/',
                flashMasg: Flash.getMessage(req)
            })
        }
    }
]

module.exports = app => routers.forEach(r => r.path === '/' ? app.get(r.path, r.controller) : app.use(r.path, r.controller))