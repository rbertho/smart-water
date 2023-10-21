const consumptionsModel = require('../models/consumptionsModel');

const getAll = async (req, res) => {
    const tasks = await consumptionsModel.getAll();
    console.log('teste: ', tasks)
    console.log('Registros encontrados: ', tasks[0].length)
    return res.status(200).set({'Access-Control-Allow-Origin': '*'}).json(tasks[0]);
};

const getFiltered = async (req, res) => {
    const tasks = await consumptionsModel.getFiltered(req);

    console.log('Registros encontrados: ', tasks[0].length)
    return res.status(200).set({'Access-Control-Allow-Origin': '*'}).json(tasks[0]);
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