const mysql = require('mysql');

const conexion = mysql.createConnection({
    host:'https://rhypers-system.onrender.com/',
    user: process.env.USER_ADMIN,
    password: process.env.PASS_ADMIN,
    database: 'Proyecto'

})

conexion.connect
