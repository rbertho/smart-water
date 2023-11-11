const express = require('express');
const router = express.Router();

const loginController = require('./controllers/LoginController');
const consumptionsController = require('./controllers/consumptionsController');
const comsumptionsMiddleware = require('./middlewares/consumptionsMiddleware')


router.post('/login', loginController.login);
router.get('/consumptionsByDevice', consumptionsController.getFiltered);
router.get('/consumptions', consumptionsController.getAll);
router.post('/consumptions', comsumptionsMiddleware.validateBody, consumptionsController.addConsumption);
router.get('/renter', consumptionsController.getRenterDetails);

module.exports = router;