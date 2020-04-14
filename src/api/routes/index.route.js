import { Router } from 'express';
import Controllers from '../controllers/index.controller';
// import bodyValidation from '../middlewares/validation.middleware';


const { jsonController, xmlController, logsController } = Controllers;


const router = Router();


router.post('/on-covid-19/json', jsonController);

router.post('/on-covid-19/xml', xmlController);

router.get('/on-covid-19/logs', logsController);


export default router;
