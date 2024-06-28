import { Request, Response } from 'express';
import { ApplicationServices } from './application.service';

const createApplicationController = async (req: Request, res: Response) => {
  try {
    const payload = req.body;
    payload.cv = 'uploads/' + req?.file?.filename;

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

export const ApplicationController = {
  createApplicationController,
};
