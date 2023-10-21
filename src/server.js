const app = require('./app');
require('dotenv').config();


app.listen(3333, () => console.log('Server running on port 3333'), console.log('http://localhost:3333/consumptions'));

