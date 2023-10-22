require('dotenv').config();

/*
const postgres = require('postgres');

const connection = postgres(process.env.DATABASE_URL, { ssl: 'require' });

module.exports = connection


const { Client } = require('pg');

const client = new Client({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    port: process.env.PGPORT,
    ssl: true
});

client.connect();

*/

require('dotenv').config()
const { Pool } = require('pg')

// pools will use environment variables for connection information
const pool = new Pool()
// const pool = new Pool({ ssl: true }); This works too in the absence of PGSSLMODE
pool.on('error', function (err) {
    console.log('idle client error', err.message, err.stack)
})

module.exports = {
    pool,
    query: (text, params, callback) => {
        return pool.query(text, params, callback)
    }
}