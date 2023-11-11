const loginModel = require('../models/loginModel');

const login = async (req, res) => {
    const result = await loginModel.login(req, res);

    console.log('Registros encontrados: ', result.rows.length)
    let success = result.rows.length > 0;
    let returnCode = success ? 200 : 404;
    return res.status(returnCode).set({'Access-Control-Allow-Origin': '*'}).json(result.rows);
};


module.exports = {
    login
};