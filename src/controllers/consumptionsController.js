const consumptionsModel = require('../models/consumptionsModel');

const getAll = async (req, res) => {
    const rows = await consumptionsModel.getAll();
    console.log('Response: ', rows)
    console.log('Registros encontrados: ', rows.length)
    return res.status(200).set({'Access-Control-Allow-Origin': '*'}).json(rows);
};

const getFiltered = async (req, res) => {
    const rows = await consumptionsModel.getFiltered(req);

    console.log('Registros encontrados: ', rows[0].length)
    return res.status(200).set({'Access-Control-Allow-Origin': '*'}).json(rows[0]);
};

const addConsumption = async (req, res) => {
    const addConsumption = await consumptionsModel.addConsumption(req.body);
    return res.status(201).json(addConsumption)
};

module.exports = {
    getAll,
    getFiltered,
    addConsumption
};