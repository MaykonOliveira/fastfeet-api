import { MissingParamError } from '../errors'
import { Validator } from '../protocols'
import { ValidatorComposite } from './validator-composite'

class ValidatorStub implements Validator {
  validate (data: any): Error {
    return null
  }
}

describe('Validator Composite', () => {
  test('should call validators with correctly values', () => {
    const validator1 = new ValidatorStub()
    const validator2 = new ValidatorStub()

    const spy1 = jest.spyOn(validator1, 'validate')
    const spy2 = jest.spyOn(validator2, 'validate')

    const sut = new ValidatorComposite([validator1, validator2])

    const data = { field: 'foo' }
    const result = sut.validate(data)

    expect(spy1).toHaveBeenCalledWith(data)
    expect(spy2).toHaveBeenCalledWith(data)
    expect(result).toBeNull()
  })

  test('should return error if validator returns error', () => {
    const validator = new ValidatorStub()

    jest.spyOn(validator, 'validate').mockReturnValueOnce(new MissingParamError('foo'))

    const sut = new ValidatorComposite([validator])

    const data = { field: 'foo' }
    const result = sut.validate(data)

    expect(result).toEqual(new MissingParamError('foo'))
  })
})
