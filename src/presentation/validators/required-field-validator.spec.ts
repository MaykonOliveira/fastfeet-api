import { MissingParamError } from '../errors'
import { RequiredFieldValidator } from './required-field-validator'

describe('Required Field Validator', () => {
  test('should return null if the field is passed on validation', () => {
    const sut = new RequiredFieldValidator('foo')

    const result = sut.validate({ foo: 'any' })

    expect(result).toBeNull()
  })

  test('should return MissingParamError if the field is not passed on validation', () => {
    const sut = new RequiredFieldValidator('foo')

    const result = sut.validate({})

    expect(result).toEqual(new MissingParamError('foo'))
  })
})
