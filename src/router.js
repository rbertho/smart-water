const express = require('express');
const router = express.Router();

const consumptionsController = require('./controllers/consumptionsController');
const comsumptionsMiddleware = require('./middlewares/consumptionsMiddleware')


router.get('/consumptionsByDevice', consumptionsController.getFiltered);
router.get('/consumptions', consumptionsController.getAll);
router.post('/consumptions', comsumptionsMiddleware.validateBody, consumptionsController.addConsumption);

module.exports = router;