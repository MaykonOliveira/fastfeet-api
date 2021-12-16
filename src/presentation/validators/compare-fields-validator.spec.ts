import { InvalidParamError } from '../errors'
import { CompareFieldsValidator } from './compare-fields-validator'

describe('Compare Fields Validator', () => {
  test('should return null if the field is passed on validation', () => {
    const sut = new CompareFieldsValidator('foo', 'fooConfirmation')

    const result = sut.validate({ foo: 'any', fooConfirmation: 'any' })

    expect(result).toBeNull()
  })

  test('should return InvalidParamError if the field is not passed on validation', () => {
    const sut = new CompareFieldsValidator('foo', 'fooConfirmation')

    const result = sut.validate({ foo: 'any', fooConfirmation: 'any_invalid' })

    expect(result).toEqual(new InvalidParamError('fooConfirmation'))
  })
})
