import bcrypt from "bcryptjs";

const { BCRYPT_SALT } = process.env;

export const hashPassword = (unhashed: string): string => {
  return bcrypt.hashSync(unhashed, Number(BCRYPT_SALT));
};

export const verifyPassword = (
  passwordString: string,
  passwordHash: string
): boolean => {
  return bcrypt.compareSync(passwordString, passwordHash);
};
