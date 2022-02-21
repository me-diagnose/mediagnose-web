export interface IUser {
  username: string;
  email: string;
  age: number;
  gender: number;
  orderDate: string;
}

export interface IRegistration {
  username: string;
  email: string;
  password: string;
  age: number;
  gender: number;
}

export interface IAuthResponse {
  accessToken: string,
  orderDate: string
}
