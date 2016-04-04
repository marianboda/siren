request = require('request')
cheerio = require('cheerio')
entities = require('entities')
moment = require('moment')

module.exports = {
  getPost(page) {
    var url = 'http://www.thesirenssound.com/'
    if (page > 1)
      url += `page/${page}/`
    console.log(url)
    var promise = new Promise( (resolve, reject) => {
      request(url, (err, response, html) => {
        var a = []
        if (!err) {
          $ = cheerio.load(html)
          posts = $('.post')
          a = posts.map((i,v) => {
            var post = {}
            post.postid = v.attribs.id
            post.title = entities.decodeHTML($('h2 a',v).html())
            post.link = $('h2 a',v).attr('href')
            post.content = entities.decodeHTML($(v).html())
            var rawDateContainer = entities.decodeHTML($('p.info',v).html())
            var rawDate = rawDateContainer.substr(0,rawDateContainer.indexOf('/')-1)
            post.date = moment(rawDate, 'MMMM Do, YYYY').format('YYYY-MM-DD')
            console.log(post.date)
            return post
          })
          resolve(a.toArray())
          return
        }
        reject()
        return null
      })
    })
    return promise
  }
}
