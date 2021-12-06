import * as bcrypt from 'bcryptjs';

export function hashPassword(password: string): string {
  const salt = bcrypt.genSaltSync(10);
  let hashedPassword: string = bcrypt.hashSync(password, salt)
  console.log(hashedPassword)

  return hashedPassword;
}
