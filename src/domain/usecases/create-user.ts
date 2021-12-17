import { UserModel } from '../models/user'

export interface CreateUserDTO {
  name: string
  email: string
  cpf: string
  password: string
  admin: boolean
}

export interface CreateUser {
  execute: (data: CreateUserDTO) => Promise<UserModel>
}
