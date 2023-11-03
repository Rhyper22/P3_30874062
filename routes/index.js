var express = require('express');
var router = express.Router();

var conexion = require('./database');

router.get('/', function(req, res, next) {
  conexion.query('SELECT * FROM Productos', (error, results)=>{
    if(error){
      throw error;
    }else{
      res.send(results);
    }
  });
});

/* GET home page. */
router.get('/about', function(req, res, next) {
  res.render('student.ejs', { title: 'Rafael Funes' });
});


module.exports = router;
