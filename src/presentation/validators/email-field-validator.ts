import { InvalidParamError } from '../errors'
import { Validator } from '../protocols'
import { EmailValidator } from '../protocols/email-validator'

export class EmailFieldValidator implements Validator {
  private readonly field: string
  private readonly emailValidator: EmailValidator
  constructor (field: string, emailValidator: EmailValidator) {
    this.field = field
    this.emailValidator = emailValidator
  }

  validate (data: any): Error {
    const isValid = this.emailValidator.isValid(data[this.field])
    if (!isValid) {
      return new InvalidParamError('email')
    }
    return null
  }
}
