const pool = require('./postgres');

const login = async (req, res) => {
    const values = [
        req.body.email, 
        req.body.password
    ]
    console.log('chamou o LOGIN: ', values[0], values[1])
    const result = await pool.query(`SELECT * FROM users WHERE email = $1 AND password = $2`, [values[0], values[1]]);
//    const result = await pool.query(`SELECT * FROM users WHERE email = 'rodrigobert@gmail.com' AND password = 'pass123'`);
    return result
};



module.exports = {
    login
};