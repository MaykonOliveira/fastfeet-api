import { InvalidParamError } from '../errors'
import { Validator } from '../protocols'

export class CompareFieldsValidator implements Validator {
  private readonly field: string
  private readonly fieldToCompare: string
  constructor (field: string, fieldToCompare: string) {
    this.field = field
    this.fieldToCompare = fieldToCompare
  }

  validate (data: any): Error {
    if (data[this.field] !== data[this.fieldToCompare]) {
      return new InvalidParamError(this.fieldToCompare)
    }

    return null
  }
}
