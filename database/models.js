const { name } = require('ejs');
const db = require('./conexion.js');

let querys = {
    obtproductos: 'SELECT * FROM Productos',
    obtproductosid: 'SELECT * FROM Productos WHERE id = ?',
    obtcategorias: 'SELECT * FROM Categorias',
    obtcategoriasid: 'SELECT * FROM Categorias WHERE id = ?',  
    insertProductos: 'INSERT INTO Productos (Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo, categoria_id, Image) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)',
    insertCategorias: 'INSERT INTO Categorias (Nombre) VALUES (?)',
    insertImages: 'INSERT INTO Images (url, Productos_id) VALUES (?, ?)',
    editCategorias: 'UPDATE Categorias SET Nombre = ? WHERE id = ?',
    editProductos: 'UPDATE Productos SET Nombre = ?, Codigo = ?, Precio = ?, Descripcion = ?, FCardiaca = ?, DRecorrida = ?, Correo = ?, categoria_id = ? WHERE id = ?',
    deleteProductos: 'DELETE FROM Productos WHERE id = ?',
    deleteCategorias: 'DELETE FROM Categorias WHERE id = ?',
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

obtcategoriasid(id) {
    return new Promise((resolve, reject) => {
        db.all(querys.obtcategoriasid, [id], (err, rows) => {
            if(err) reject(err);
            resolve(rows);
        })
    })
},

editCategorias(id, Nombre) {
    return new Promise((resolve, reject) => {
        db.run(querys.editCategorias, [Nombre, id], (err) => {
            if (err) reject(err);
            resolve();
        })
    })
},

insertProductos(Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo, categoria_id, Image) {
    return new Promise((resolve, reject) => {
        db.run(querys.insertProductos, [Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo, categoria_id, Image], (err) => {
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
},

deleteCategorias(id) {
    return new Promise((resolve, reject) => {
        db.run(querys.deleteCategorias, [id], (err) => {
            if(err) reject(err);
            resolve();
        })
    })
},

insertCategorias(Nombre) {
    return new Promise((resolve, reject) => {
        db.run(querys.insertCategorias, [Nombre], (err) => {
            if (err) reject(err);
            resolve();
        })
    })
},

insertImages(url, Productos_id) {
    return new Promise((resolve, reject) => {
        db.run(querys.insertImages, [url, Productos_id], (err) => {
            if (err) reject(err);
            resolve();
        })
    })
}
};
 
 
