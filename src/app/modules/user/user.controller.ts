import { Request, Response } from 'express';
import { UserServices } from './user.service';

const createUser = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.createUserIntoDB(req.body);

    res.status(200).json({
      success: true,
      status: 200,
      message: 'User created successful!',
      data: result,
    });
  } catch (err: unknown) {
    console.log(err);
  }
};

const loginUserFromDB = async (req: Request, res: Response) => {
  try {
    const result = await UserServices.loginUser(req.body);

    res.json(result);
  } catch (err: unknown) {
    console.log(err);
  }
};

export const UserController = {
  loginUserFromDB,
  createUser,
};
