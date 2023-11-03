var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/about', function(req, res, next) {
  res.render('student.ejs', { title: 'Rafael Funes' });
});

router.get('/', function(req, res, next) {
  res.render('index.ejs', { title: 'Form_User' });
});

module.exports = router;
