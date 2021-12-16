import { MissingParamError } from '../errors'
import { Validator } from '../protocols'

export class RequiredFieldValidator implements Validator {
  private readonly field: string
  constructor (field: string) {
    this.field = field
  }

  validate (data: any): Error {
    if (!data[this.field]) {
      return new MissingParamError(this.field)
    }

    return null
  }
}
