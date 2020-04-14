const Router = require('express');
const {
  jsonController,
  xmlController,
  logsController
} = require('../controllers/index.controller');
// import bodyValidation from '../middlewares/validation.middleware';


// const { jsonController, xmlController, logsController } = Controllers;
// console.log(Controllers.jsonController);


const router = Router();


router.post('/on-covid-19/json', jsonController);

router.post('/on-covid-19/xml', xmlController);

router.get('/on-covid-19/logs', logsController);


module.exports = router;
