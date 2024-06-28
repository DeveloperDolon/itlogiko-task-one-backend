import { Request, Response } from 'express';
import { ApplicationServices } from './application.service';
import { ApplicationModel } from './application.model';
import jwt, { JwtPayload } from 'jsonwebtoken';
import config from '../../config';
import { UserModel } from '../user/user.model';
import cloudinary from '../../utils/cloudinary';

const createApplicationController = async (req: Request, res: Response) => {
  try {
    cloudinary.uploader.upload(
      req?.file?.path,
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      async function (err: unknown, result2: any) {
        if (err) {
          return res.status(500).json({
            success: false,
            message: 'Error',
          });
        }

        const payload = req.body;
        payload.cv = result2?.secure_url;

        const result =
          await ApplicationServices.createApplicationIntoDB(payload);

        res.status(200).json({
          success: true,
          message: 'Application submitted successfully!',
          data: result,
        });
      },
    );
  } catch (err: unknown) {
    console.log(err);
  }
};

const getAllApplication = async (req: Request, res: Response) => {
  try {
    const token = req?.headers?.authorization?.replace('Bearer ', '');

    if (!token) {
      res.status(401).json({
        success: false,
        status: 401,
        message: 'Unauthorized request!',
      });
    }

    const decode = jwt.verify(
      token as string,
      config.jwt_access_secret as string,
    ) as JwtPayload;

    const { role, userEmail } = decode;

    const user = await UserModel.isUserExistsByEmail(userEmail);

    if (!user) {
      res.status(401).json({
        success: false,
        status: 404,
        message: 'This user is not found!',
      });
    }

    if (role !== 'admin') {
      res.status(401).json({
        success: false,
        status: 401,
        message: 'You have no access to this route!',
      });
    }

    const result = await ApplicationModel.find();

    res.status(200).json({
      success: true,
      message: 'Applications data retrieved successfully!',
      data: result,
    });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (err: any) {
    console.log(err?.message);
  }
};

export const ApplicationController = {
  createApplicationController,
  getAllApplication,
};
