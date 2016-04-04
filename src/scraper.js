'use strict'
var DB = require('./services/DBService').getDB()
var Siren = require('./services/SirensSound')

var fetch = function(err, scraperData) {
  if (err != null)
    return console.log('sheeeeet', err)

  let current = scraperData.lastpage + 1
  Siren.getPost(current).then((data) => {
    console.log(`Page ${current}, Posts: `, data.length)
    if (data.length < 1) {
      console.log('-- All done --')
      return null
    }

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
      // console.log(`INSERT INTO posts ${str}`)
      DB.run(`INSERT INTO posts ${str}`, (err, data) => { if (err) console.log(err, data) })
    }
    DB.run('UPDATE scrapes SET lastPage='+current+' WHERE webpage = \'thesirenssound\'')
    fetch(null, Object.assign({}, scraperData, {lastpage: current}))
  })

}

DB.get('SELECT * FROM scrapes WHERE webpage = \'thesirenssound\'', fetch)
