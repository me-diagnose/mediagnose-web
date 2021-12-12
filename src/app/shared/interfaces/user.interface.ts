export interface IUser {
  username: string;
  email: string;
  age: number;
  gender: UserGender;
}

export interface IRegistration {
  username: string;
  email: string;
  password: string;
  age: number;
  gender: UserGender;
}

export enum UserGender {
  MALE = 'male',
  FEMALE = 'female'
}
