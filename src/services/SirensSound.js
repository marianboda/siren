request = require('request')
cheerio = require('cheerio')
entities = require('entities')

module.exports = function getPost(page) {
  var url = 'http://www.thesirenssound.com/'
  if (page > 1)
    url += `page/${page}/`
  var promise = new Promise( (resolve, reject) => {
    request(url, (err, response, html) => {
      var a = []
      if (!err) {
        $ = cheerio.load(html)
        posts = $('.post')
        a = posts.map((i,v) => {
          var post = {}
          post.id = v.attribs.id
          post.title = entities.decodeHTML($('h2 a',v).html())
          post.link = $('h2 a',v).attr('href')
          post.content = entities.decodeHTML($(v).html())
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
