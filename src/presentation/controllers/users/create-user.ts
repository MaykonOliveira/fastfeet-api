import { CreateUser } from '../../../domain/usecases/create-user'
import { ok } from '../../helpers/http'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class CreateUserController implements Controller {
  private readonly createUser: CreateUser

  constructor (createUser: CreateUser) {
    this.createUser = createUser
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    const { name, email, cpf, password, admin } = httpRequest.body

    const user = await this.createUser.execute({
      name,
      email,
      cpf,
      password,
      admin
    })

    return ok(user)
  }
}
