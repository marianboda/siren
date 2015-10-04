var express = require('express')
var app = express()
var siren = require('./src/services/SirensSound')
var path = require('path')

console.log(siren)

app.use(require('serve-static')(path.join(__dirname, 'static')))

app.get('/', function (req, res) {
  siren(2).then(
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
