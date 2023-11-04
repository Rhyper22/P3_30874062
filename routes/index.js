var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('student.ejs', { title: 'Rafael Funes' });
});

module.exports = router;
