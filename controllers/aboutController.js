const Flash = require('../utils/Flash')

exports.getAboutController = (req, res, next) => {
    // render About Routes
    res.render('page/about', {
        title: 'About | Portfolio',
        path: '/about',
        flashMasg: Flash.getMessage(req)
    })
}