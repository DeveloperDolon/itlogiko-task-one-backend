import config from '../../config';
import { TTokenPayload, createToken } from '../../utils/createToken';
import { TLoginUser, TUser } from './user.interface';
import { UserModel } from './user.model';

const createUserIntoDB = async (payload: TUser) => {
  const result = await UserModel.create(payload);

  return result;
};

const loginUser = async (payload: TLoginUser) => {
  const user = await UserModel.findOne({
    email: payload?.email,
  });

  const isPasswordMatched = await UserModel.isPasswordMatched(
    payload?.password,
    user?.password as string,
  );

  if (!user) {
    return {
      status: 404,
      success: false,
      message: 'Unknown user!',
    };
  }

  if (!isPasswordMatched) {
    return {
      status: 404,
      success: false,
      message: 'Password is incorrect!',
    };
  }

  const userInfo = {
    userEmail: user?.email,
    role: user?.role,
  };

  const accessToken = createToken(
    userInfo as TTokenPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string,
  );

  return {
    status: 200,
    success: true,
    message: 'User logged in successfully!',
    token: accessToken,
    user: user,
  };
};

export const UserServices = {
  loginUser,
  createUserIntoDB,
};
