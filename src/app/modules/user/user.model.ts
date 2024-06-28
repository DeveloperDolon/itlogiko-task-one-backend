import { Schema, model } from 'mongoose';
import bcrypt from 'bcrypt';
import { TUser, UserAnoModel } from './user.interface';

const userSchema = new Schema<TUser>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    required: true,
  },
});

userSchema.statics.isUserExistsByEmail = async function (email: string) {
  return await UserModel.findOne({ email }).select('+password');
};

userSchema.statics.isPasswordMatched = async function (
  plainTextPassword,
  hashedPassword,
) {
  return await bcrypt.compare(plainTextPassword, hashedPassword);
};

export const UserModel = model<TUser, UserAnoModel>('User', userSchema);
