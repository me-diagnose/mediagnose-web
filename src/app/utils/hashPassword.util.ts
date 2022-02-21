import * as bcrypt from 'bcryptjs';
import {environment} from '../../environments/environment';

export function hashPassword(password: string): string {
  const salt = environment.mediagnoseAPI.salt;
  return bcrypt.hashSync(password, salt)
}
