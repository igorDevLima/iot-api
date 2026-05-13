import { Router } from 'express';
import { SensorController } from './sensorController';

const router = Router();

router.post('/sensors', SensorController.createSensorData);
router.get('/sensors', SensorController.getLatestSensorData);
router.get('/sensors/last/:limit', SensorController.getLastNRecords);
router.get('/sensors/chart', SensorController.getChartData);

export default router;