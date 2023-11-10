const { name } = require('ejs');
const db = require('./conexion.js');

let querys = {
    obtproductos: 'SELECT * FROM Productos',
    obtproductosid: 'SELECT * FROM Productos WHERE id = ?',
    obtcategorias: 'SELECT * FROM Categorias',
    insertProductos: 'INSERT INTO Productos (Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo, categoria_id, Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    insertCategorias: 'INSERT INTO Categorias (Nombre) VALUES (?)',
    editProductos: 'UPDATE Productos SET Nombre = ?, Codigo = ?, Precio = ?, Descripcion = ?, FCardiaca = ?, DRecorrida = ?, Correo = ?, categoria_id = ? WHERE id = ?',
    deleteProductos: 'DELETE FROM Productos WHERE id = ?'
};

module.exports = {
    obtproductos() {
        return new Promise((resolve, reject) => {
            db.all(querys.obtproductos, (err, rows) => {
                if (err) reject(err);
                resolve(rows);
            })
        });
    },         

    obtproductosid(id) {
        return new Promise((resolve, reject) => {
            db.all(querys.obtproductosid, [id], (err, rows) => {
                if(err) reject(err);
                resolve(rows);
            })
        })
    },



obtcategorias() {
    return new Promise((resolve, reject) => {
        db.all(querys.obtcategorias, (err, rows) => {
            if (err) {
                reject(err);
            } else {
                resolve(rows);
            }
        });
    });
},

insertProductos(Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo, Image, categoria_id) {
    return new Promise((resolve, reject) => {
        db.run(querys.insertProductos, [Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo, Image, categoria_id], (err) => {
            if (err) reject(err);
            resolve();
        })
    })
}, 

editProductos(id, Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo, categoria_id) {
    return new Promise((resolve, reject) => {
        db.run(querys.editProductos, [Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo, categoria_id, id], (err) => {
            if (err) reject(err);
            resolve();
        })
    })
     
},


deleteProductos(id) {
    return new Promise((resolve, reject) => {
        db.run(querys.deleteProductos, [id], (err) => {
            if(err) reject(err);
            resolve();
        })
    })
}
 };
 
