var express = require('express');
var router = express.Router();
const db = require('../database/models');
const uploads = require('../routes/multer');
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

router.get('/about', (req, res) =>{
  res.render('about');
});

//MOSTRAR PRODUCTOS
router.get('/', (req, res) =>{
  db.obtproductos()
  .then(data =>{
    res.render('index', {productos: data});
  })
  .catch(err =>{
    res.render('index', {productos: []});
  })
})

//INSERTAR CATEGORIAS
router.get('/insert-categoria', (req, res) =>{
  res.render('insert-categoria');
})

router.post('/insert-categoria', (req, res) =>{
  const {categoria_id} = req.body;
  db.insertCategorias(categoria_id)
  .then(() =>{
    res.redirect('/categorias');
  })
  .catch(err =>{
    console.log(err);
  })
})

//MOSTRAR CATEGORIAS
router.get('/categorias', (req, res) =>{
  db.obtcategorias()
  .then(data =>{
    res.render('categorias', {categorias: data});
  })
})

//EDITAR CATEGORIAS
router.get('/edit-categorias/:id', (req, res) =>{
  const id = req.params.id;
  db.obtcategoriasid(id)
  .then(data =>{
    res.render('edit-categorias', {categoria: data[0]});
  })
  .catch(err =>{
    console.log(err);
    res.render('edit-categorias', {categoria: []});
  })
})

router.post('/edit-categorias/', (req, res) =>{
  const {id, Nombre} = req.body;
  db.editCategorias(id, Nombre)
  .then(() =>{
    res.redirect('/categorias');
  })
  .catch(err =>{
    console.log(err);
  });
})



//INSERTAR PRODUCTOS
router.get('/insert', (req, res) =>{
  res.render('insert');
});

router.post('/insert-Productos', (req, res) =>{
  const {Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo, categoria_id, Image} = req.body;
  db.insertProductos(Nombre, Codigo, Precio, Descripcion, FCardiaca, DRecorrida, Correo, categoria_id, Image)
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

   router.get('/delete-categorias/:id', (req, res) =>{
     const id = req.params.id;
     db.deleteCategorias(id)
     .then(() =>{
       res.redirect('/categorias');
     })
     .catch(err =>{
       console.log(err);
     })
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

    //AGREGAR IMAGENES
    router.get('/add-image/:id', (req, res) =>{
      const id = req.params.id;
      res.render('add-image', {id: id});
    })

    router.post('/cargar-img', uploads.array('img', 4) ,(req, res) => {

      console.log(outputArray)
     });


  
module.exports = router;

