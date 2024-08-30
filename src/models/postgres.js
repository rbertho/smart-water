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