const pool = require('./postgres');

const getAll = async () => {
    console.log('chamou o GET ALL')
    const resultSet = await pool.query(`SELECT * FROM consumption ORDER BY create_time`);
    return resultSet;
};

const getTotalConsumptionByMonth = async () => {
    console.log('chamou o GET Total Consumption By Month')
    let query = `SELECT SUM(C.consumption_amount) AS consumption_amount, ` +
                `date_trunc('month', C.create_time) AS month, C.id_device as id_device, rent_unit ` +
                `FROM consumption C, users U, device D ` +
                `WHERE U.id_user = D.id_user ` +
                `AND D.id_device = C.id_device ` +
                `GROUP BY C.id_device, rent_unit, month ` +
                `ORDER BY month, c.id_device`;
    return await pool.query(query);
};

const getFiltered = async (req) => {
    const id = req.query.id_device
    console.log('chamou o GET FILTERED: id_device:', id)
    let query = `SELECT date_trunc('day', create_time) AS create_time, sum(consumption_amount) as consumption_amount, id_device ` +
                `FROM consumption ` + 
                `WHERE id_device = $1 ` +
                `GROUP BY date_trunc('day', create_time), id_device ` + 
                `ORDER BY date_trunc('day', create_time)`;	
                console.log(query)
    return await pool.query(query, [id]);
};

const getFilteredByMonth = async (req) => {
    const id = req.query.id_device
    console.log('chamou o GET FILTERED: id_device:', id)
    let query = `SELECT sum(consumption_amount) as consumption_amount, date_trunc('month', create_time) ` +
                `FROM consumption ` + 
                `WHERE id_device = $1 ` + 
                `GROUP BY date_trunc('month', create_time) `;
    const result = await pool.query(query, [id]);
    return result
};

const getRenterDetails = async (req) => {
    const id = req.query.id_device
    console.log('chamou o GET Renter: id_device:', id)
    let query = `SELECT name, rent_unit FROM users u WHERE u.id_user in (` +
        `SELECT d.id_user FROM device d WHERE id_device = $1)`
    const result = await pool.query(query, [id]);
    return result
}

const addConsumption = async (req) => {
    console.log('chamou o POST')
    console.log(req)

    let valuesArray = [];

    // iterate over the array of objects req
    for (let i = 0; i < req.length; i++) {
        // get the values of each object
        let values = Object.values(req[i]);
        // push the values to the array
        valuesArray.push(values);
    }
    console.log(valuesArray);

    var format = require('pg-format');

    let query = 'INSERT INTO consumption(id_device, consumption_amount, create_time) VALUES %L';
    return await pool.query(format(query, valuesArray))
}


module.exports = {
    getAll, 
    getTotalConsumptionByMonth,
    getFiltered,
    getRenterDetails,
    getFilteredByMonth,
    addConsumption
};