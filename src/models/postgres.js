const postgres = require('postgres');
require('dotenv').config();

const connection = postgres(process.env.DATABASE_URL, { ssl: 'require' });

async function getPostgresVersion() {
  const response = await connection`select version()`;
  console.log(response);
}

//getPostgresVersion();

module.exports = connection