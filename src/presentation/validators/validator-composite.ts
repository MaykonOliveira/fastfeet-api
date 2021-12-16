import { Validator } from '../protocols'

export class ValidatorComposite implements Validator {
  private readonly validators: Validator[]

  constructor (validators: Validator[]) {
    this.validators = validators
  }

  validate (data: any): Error {
    for (const validator of this.validators) {
      const error = validator.validate(data)

      if (error) {
        return error
      }
    }

    return null
  }
}
