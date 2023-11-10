const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/database.db', (err) => {
    if (err) {
        console.error(err.message);
    }});

    db.run('CREATE TABLE IF NOT EXISTS Productos (id INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT, Codigo INTEGER, Precio INTEGER, Descripcion TEXT, FCardiaca INTEGER, DRecorrida INTEGER, Correo TEXT, Image TEXT, categoria_id INTEGER, FOREIGN KEY (categoria_id) REFERENCES categorias(id))');
    db.run('CREATE TABLE IF NOT EXISTS Categorias (id INTEGER PRIMARY KEY AUTOINCREMENT, Nombre TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS Images (id INTEGER PRIMARY KEY AUTOINCREMENT, url TEXT, Productos_id INTEGER, FOREIGN KEY (Productos_id) REFERENCES Productos(id))');
    console.log('Base de datos conectada');

module.exports = db;