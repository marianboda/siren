'use strict'
var express = require('express')
var app = express()
var path = require('path')

var siren = require('./src/services/SirensSound')
var DB = require('./src/services/DBService')

app.use(require('serve-static')(path.join(__dirname, 'static')))

app.get('/api/dispatch', function (req, res) {
  let type = req.query.type
  let payload = req.query.payload
  res.send(JSON.stringify({type: type, payload: payload}))
})

app.get('/api/posts', function (req, res) {
  DB.get('posts', null, (err, posts) => {
      console.log('posts', posts, err)
      res.send(JSON.stringify(posts))
    }
  )
})
app.get('/api/siren', function (req, res) {
  siren().then(
    (posts) => {
      res.send(JSON.stringify(posts))
    }
  )
})

var server = app.listen(3000, function () {
  var host = server.address().address
  var port = server.address().port

  console.log('Example app listening at http://%s:%s', host, port)
});
