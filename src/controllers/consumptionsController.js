const consumptionsModel = require('../models/consumptionsModel');

const getAll = async (req, res) => {
    const result = await consumptionsModel.getAll();

    console.log('Registros encontrados: ', result.rows.length)
    return res.status(200).set({'Access-Control-Allow-Origin': '*'}).json(result.rows);
};

const getFiltered = async (req, res) => {
    const result = await consumptionsModel.getFiltered(req);
    console.log('Registros encontrados: ', result.rows.length)
    return res.status(200).set({'Access-Control-Allow-Origin': '*'}).json(result.rows);
};

const getFilteredByMonth = async (req, res) => {
    const result = await consumptionsModel.getFilteredByMonth(req);
    console.log('Registros encontrados: ', result.rows.length)
    return res.status(200).set({'Access-Control-Allow-Origin': '*'}).json(result.rows);
};

const getRenterDetails = async (req, res) => {
    const result = await consumptionsModel.getRenterDetails(req);

    console.log('Registros encontrados: ', result.rows.length)
    return res.status(200).set({'Access-Control-Allow-Origin': '*'}).json(result.rows);
};

const addConsumption = async (req, res) => {
    console.log(req)
    const addConsumption = await consumptionsModel.addConsumption(req.body);
    const {rowCount} = addConsumption;
    console.log('Registros afetados: ', rowCount)
    return res.status(201).json('[]')
};

module.exports = {
    getAll,
    getFiltered,
    getRenterDetails,
    getFilteredByMonth,
    addConsumption
};