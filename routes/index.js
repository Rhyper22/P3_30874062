var express = require('express');
var router = express.Router();
const db = require('../database/models');
require('dotenv').config()

//LOGIN DE USUARIO
let login = false;

router.get('/',(req, res,) => {
  if(!login){
    res.render('login');
  }else{
    db.obtproductos()
    .then(data => {
      res.render('index', {productos: data});
    })
    .catch(err => {
      res.render('index', {productos: []});	
    })

  }
});

router.get('/', (req, res) =>{
  db.obtproductos()
  .then(data =>{
    res.render('index', {productos: data});
  })
  .catch(err =>{
    res.render('index', {productos: []});
  })
})


//MOSTRAR CATEGORIAS
router.get('/categorias', (req, res) =>{
  db.obtcategorias()
  .then(data =>{
    res.render('categorias', {categorias: data});
  })
})

//INSERTAR PRODUCTOS
router.get('/insert', (req, res) =>{
  res.render('insert');
});

router.post('/insert-Productos', (req, res) =>{
  const {Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo, categoria_id} = req.body;
  db.insertProductos(Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo, categoria_id)
  .then(() =>{
    res.redirect('/');
  })
  .catch(err =>{
    console.log(err);
  })
})


// EDITAR PRODUCTOS
router.get('/edit/:id', (req, res) =>{
  const id = req.params.id;
  db.obtproductosid(id)
  .then(data =>{
    res.render('edit', {producto: data[0]});
  })
  .catch(err =>{
    console.log(err);
    res.render('edit', {producto: []});
  })
})


router.post('/edit/', (req, res) =>{
  const {id, Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo, categoria_id} = req.body;
  db.editProductos(id, Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo, categoria_id)
  .then(() =>{
    res.redirect('/');
  })
  .catch(err =>{
    console.log(err);
  });
});


  router.post('/edit/:id', (req, res) => {
    const {id, Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo, categoria_id}= req.body.id;
    db.obtproductoid(id, Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo, categoria_id)
      .then(data =>{
        res.render('edit', {producto: data});
      }) 
      .catch(err =>{
        console.log(err);
        res.render('edit', {producto: []});
      });
    })

    //ELIMINAR PRODUCTOS
    router.get('/delete/:id', (req, res) => {
      const id = req.params.id;
      db.deleteProductos(id)
        .then(() =>{
          res.redirect('/');
        })
        .catch(err =>{
          console.log(err);
        })
    })

    router.post('/login', (req, res) => {
      const {user, pass} = req.body;
      if(user === process.env.USER_ADMIN && pass === process.env.PASS_ADMIN){
        login = true;
        res.redirect('/');
      }else{
        login = false;
        res.redirect('/');
      }
    })

    router.get('../views/about', (req, res) =>{
      res.render('about');
    });



module.exports = router;

