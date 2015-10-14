var SQLite = require('sqlite3')

var db = new SQLite.Database('./db.sqlite')

sqlite = {
  getDB: () => {return db},
  get: function(table, constraint, cb) {
    // if (id != null)
    //   db.run('SELECT * FROM ? WHERE id = ?', table, id, cb)
    if (Number.isInteger(constraint))
      db.run('SELECT * FROM ? WHERE id = ?', table, constraint, cb)
    else if (typeof constraint == 'object') {
      if (constraint != null && constraint.hasOwnProperty('where')) {
        db.all('SELECT * FROM table WHERE id < 100')
      }
    }
      db.all('SELECT * FROM posts', cb)
  }
}

module.exports = sqlite
