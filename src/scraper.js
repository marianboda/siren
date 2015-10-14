'use strict'
var DB = require('./services/DBService').getDB()
var Siren = require('./services/SirensSound')

var fetch = function(err, data) {
  if (err != null)
    return console.log('sheeeeet')

  let current = data.lastpage + 1
  Siren.getPost(current + 1).then((data) => {
    console.log(`Page ${current}, Posts: `, data.length)

    for (let d of data) {
      let keys = Object.keys(d)
      let vals = []
      for (let key of keys) {
        let sanitized = (typeof d[key] == 'string') ? "'" + d[key].replace(/'/g, "''") + "'" : d[key]
        vals.push(sanitized)
      }

      let keysString = '(' + keys.join(', ') + ')'
      let valsString = '(' + vals.join(', ') + ')'
      let str = `${keysString} VALUES ${valsString}`
      console.log(`INSERT INTO posts ${str}`)
      DB.run(`INSERT INTO posts ${str}`, (err, data) => console.log(err, data))

      // DB.run('INSERT INTO posts SET lastPage='+current+'WHERE webpage = \'thesirenssound\'')
    }
    DB.run('UPDATE scrapes SET lastPage='+current+' WHERE webpage = \'thesirenssound\'')

  })




}

DB.get('SELECT * FROM scrapes WHERE webpage = \'thesirenssound\'', fetch)
