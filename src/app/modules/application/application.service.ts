import { TApplication } from './application.interface';
import { ApplicationModel } from './application.model';

const createApplicationIntoDB = async (payload: TApplication) => {
  const result = await ApplicationModel.create(payload);

  return result;
};

export const ApplicationServices = {
  createApplicationIntoDB,
};
