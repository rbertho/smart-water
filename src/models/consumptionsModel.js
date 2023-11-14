const pool = require('./postgres');

const getAll = async () => {
    console.log('chamou o GET ALL')
    const resultSet = await pool.query(`SELECT * FROM consumption ORDER BY create_time`);
    return resultSet;
};

const getFiltered = async (req) => {
    const id = req.query.id_device
    console.log('chamou o GET FILTERED: id_device:', id)
    const result = await pool.query(`SELECT * FROM consumption WHERE id_device = $1 ORDER BY create_time`, [id]);
    return result
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



const addConsumption = async (consump) => {
    console.log('chamou o POST')
    console.log(consump)
    const {id_device} = consump;
    const {consumption_amount} = consump;

    //const dateUTC = new Date(Date.now())
    const query = 'INSERT INTO consumption(id_device, consumption_amount, create_time) VALUES ($1, $2, current_timestamp)';
    return await pool.query(query, [id_device, consumption_amount]);
}


module.exports = {
    getAll, 
    getFiltered,
    getRenterDetails,
    getFilteredByMonth,
    addConsumption
};