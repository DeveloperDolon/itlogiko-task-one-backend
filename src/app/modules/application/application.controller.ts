import { Request, Response } from 'express';
import { ApplicationServices } from './application.service';
import { ApplicationModel } from './application.model';

const createApplicationController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    const serverUrl = `${req.protocol}://${req.get('host')}`;

    payload.cv = `${serverUrl}/uploads/${req?.file?.filename}`;

    const result = await ApplicationServices.createApplicationIntoDB(payload);

    res.status(200).json({
      success: true,
      message: 'Application submitted successfully!',
      data: result,
    });
  } catch (err: unknown) {
    console.log(err);
  }
};

const getAllApplication = async (req: Request, res: Response) => {
  try {
    const result = await ApplicationModel.find();

    res.status(200).json({
      success: true,
      message: 'Applications data retrieved successfully!',
      data: result,
    });
  } catch (err: unknown) {
    console.log(err);
  }
};

export const ApplicationController = {
  createApplicationController,
  getAllApplication,
};
