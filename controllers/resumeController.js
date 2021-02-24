const Flash = require('../utils/Flash')

exports.getResumeController = (req, res, next) => {
    // render resume Routes
    res.render('page/resume', {
        title: 'RESUME | Portfolio',
        path: '/resume',
        flashMasg: Flash.getMessage(req)
    })
}