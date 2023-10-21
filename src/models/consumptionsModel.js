const connection = require('./postgres');

const getAll = async () => {
    console.log('chamou o GET ALL')
    //const resultSet = await connection.execute('SELECT * FROM consumption');

    const resultSet =  await connection`SELECT * FROM consumption`
   
    return resultSet;
};

const getFiltered = async (req) => {
    const id = req.query.id_device
    console.log('chamou o GET FILTERED: id_device:', id)
    const resultSet = await connection.execute('SELECT * FROM consumption WHERE id_device = ?', [id]);
    return resultSet;
};

const addConsumption = async (consump) => {
    console.log('chamou o POST')
    console.log(consump)
    const {id_device} = consump;
    const {consumption_amount} = consump;
    const {user} = consump;

    //const dateUTC = new Date(Date.now())
    const query = 'INSERT INTO consumption(id_device, consumption_amount, id_user) VALUES (?, ?, ?)';

    const [addConsumption] = await connection.execute(query, [id_device, consumption_amount, user]);

    return {insertId: addConsumption.insertId};
}


module.exports = {
    getAll, 
    getFiltered,
    addConsumption
};