import { CreateUser } from '../../../domain/usecases/create-user'
import { ok, serverError } from '../../helpers/http'
import { Controller, HttpRequest, HttpResponse } from '../../protocols'

export class CreateUserController implements Controller {
  private readonly createUser: CreateUser

  constructor (createUser: CreateUser) {
    this.createUser = createUser
  }

  async handle (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { name, email, cpf, password } = httpRequest.body

      const user = await this.createUser.execute({
        name,
        email,
        cpf,
        password,
        admin: false
      })

      return ok(user)
    } catch (error) {
      return serverError(error)
    }
  }
}
