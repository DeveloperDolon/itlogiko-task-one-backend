import { Model } from 'mongoose';

export interface TUser {
  name: string;
  email: string;
  password: string;
  role: 'admin' | 'user';
}

export interface TLoginUser {
  email: string;
  password: string;
}

export interface UserAnoModel extends Model<TUser> {
  isPasswordMatched(
    plainTextPassword: string,
    hashedPassword: string,
  ): Promise<boolean>;
}
