import { IUser } from '../../backend-entities'

export interface IRegister {
  username: string
  password: string
}

export interface IRegisterResponse {
  message: string
}

export interface ILogin {
  username: string
  password: string
}

export interface ILoginResponse {
  message: string
  user: IUser
  token: string
}

export interface ILoginError {
  message: string
}
