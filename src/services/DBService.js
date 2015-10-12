var SQLite = require('sqlite3')

var db = new SQLite.Database('./db.sqlite')

sqlite = {
  get: function(table, id, cb) {
    // if (id != null)
    //   db.run('SELECT * FROM ? WHERE id = ?', table, id, cb)
    db.all('SELECT * FROM posts', cb)
    console.log(table)
  }
}

module.exports = sqlite
