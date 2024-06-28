import jwt from 'jsonwebtoken';

export type TTokenPayload = {
  userEmail: string;
  role: string;
};

export const createToken = (
  jwtPayload: TTokenPayload,
  secret: string,
  expiresIn: string,
) => {
  const token = jwt.sign(jwtPayload, secret, {
    expiresIn,
  });

  return token;
};
