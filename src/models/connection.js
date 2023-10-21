const mysql = require('mysql2/promise');

require('dotenv').config();

//console.log('host:' + process.env.MYSQL_HOST);
//console.log('user:' + process.env.MYSQL_USER);
//console.log('pass:' + process.env.MYSQL_PASSWORD);
//console.log('database:' + process.env.MYSQL_DB);

const connection = mysql.createPool({
host: process.env.MYSQL_HOST,
user: process.env.MYSQL_USER,
password: process.env.MYSQL_PASSWORD, 
database: process.env.MYSQL_DB,
});

module.exports = connection