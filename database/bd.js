const sqlite3= require('sqlite3').verbose();

let db = new sqlite3.Database(':memory:', (err) => {
    if (err) {
      return console.error(err.message);
    }
    console.log('Connected to the in-memory SQlite database.');
  });

  db.run("CREATE TABLE IF NOT EXISTS Productos (Productos_id INTEGER PRIMARY KEY AUTOINCREMENT, Nombre Text NOT NULL, Codigo INTEGER NOT NULL, Precio INTEGER NOT NULL, Descripcion TEXT NOT NULL, FCardiaca INTEGER NOT NULL, DRecorrida INTEGER NOT NULL, Correo TEXT NOT NULL)");

  module.exports= {
    insert: function (Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo){
        db.run("INSERT INTO Productos (Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo) VALUES (?, ?, ?, ?, ?, ?, ?)", [Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo], function (err) {
            if (err){
                return console.log(err.message);
            }
            console.log(`A row has been inserted with rowid ${this.lastID}`);
        });
    }
  },

  select= function (callback) {
    db.all("SELECT * FROM productos", [], (err,rows) => {
        if (err) {
            throw err;
        }
        callback(rows);
    });
  }  