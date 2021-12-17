import { CreateUserController } from './create-user'
import { HttpRequest } from '../../protocols'
import { CreateUser, CreateUserDTO } from '../../../domain/usecases/create-user'
import { UserModel } from '../../../domain/models/user'
import { serverError } from '../../helpers/http'

class CreateUserStub implements CreateUser {
  async execute (data: CreateUserDTO): Promise<UserModel> {
    return {
      id: 'fake_id',
      ...data
    }
  }
}

interface SutType {
  sut: CreateUserController
  createUserStub: CreateUser
}

const makeSut = (): SutType => {
  const createUserStub = new CreateUserStub()
  return {
    sut: new CreateUserController(createUserStub),
    createUserStub
  }
}

const makeFakeUser = (): CreateUserDTO => ({
  name: 'foo',
  email: 'foo@example.com',
  cpf: 'foo_cpf',
  password: 'password',
  admin: false
})

describe('Create User Controller', () => {
  test('should call CreateUser with correct values', async () => {
    const { sut, createUserStub } = makeSut()
    const executeSpy = jest.spyOn(createUserStub, 'execute')

    const user = makeFakeUser()
    const httpRequest: HttpRequest = { body: user }
    await sut.handle(httpRequest)

    expect(executeSpy).toHaveBeenCalledWith({ ...user, admin: false })
  })

  test('should return 500 if CreateUser throws error', async () => {
    const { sut, createUserStub } = makeSut()
    jest.spyOn(createUserStub, 'execute').mockImplementationOnce(async () => {
      return await new Promise((resolve, reject) => { reject(new Error('')) })
    })

    const httpResponse = await sut.handle({ body: makeFakeUser() })

    expect(httpResponse).toEqual(serverError(new Error('')))
  })
})
