import express from 'express';
import { upload } from '../../utils/helper';
import { ApplicationController } from './application.controller';

const router = express.Router();

router.post(
  '/application',
  upload.single('cv'),
  ApplicationController.createApplicationController,
);

export const ApplicationRouter = router;
