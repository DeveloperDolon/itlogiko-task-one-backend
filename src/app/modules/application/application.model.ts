import { Schema, model } from 'mongoose';
import { TApplication } from './application.interface';

const applicationSchema = new Schema<TApplication>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    cv: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

export const ApplicationModel = model<TApplication>(
  'Application',
  applicationSchema,
);
