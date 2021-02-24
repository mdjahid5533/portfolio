const cheerio = require('cheerio')

module.exports = () => {
    return (req, res, next) => {
        res.locals.truncate = html => {
            let $ = cheerio.load(html)
            let text = $.text()

            text = text.replace(/(\r\n|\n\r)/gm, '')
            if(text.length <= 54) return text
            return text.slice(0, 54) + '...'
        }
        next()
    }
}