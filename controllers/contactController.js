const Flash = require('../utils/Flash')

exports.getContactController = (req, res, next) => {
    // render Contact Routes
    res.render('page/contact', {
        title: 'Contact | Portfolio',
        path: '/contact',
        flashMasg: Flash.getMessage(req)
    })
}