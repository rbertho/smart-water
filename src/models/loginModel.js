const pool = require('./postgres');

const login = async (req, res) => {
    const values = [
        req.body.email, 
        req.body.password
    ]
    console.log('chamou o LOGIN: ', values[0], values[1])
    let query = `SELECT U.id_user, name, email, rent_unit, id_device ` +
                `FROM users U, device D ` +
                `WHERE U.id_user = D.id_user ` +
                `AND email = $1 AND password = $2`
    const result = await pool.query(query, [values[0], values[1]]);
    return result
};



module.exports = {
    login
};