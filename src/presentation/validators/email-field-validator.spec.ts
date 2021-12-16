import { InvalidParamError } from '../errors'
import { EmailValidator } from '../protocols/email-validator'
import { EmailFieldValidator } from './email-field-validator'

class EmailValidatorStub implements EmailValidator {
  isValid (email: string): boolean { return true }
}

interface SutType {
  sut: EmailFieldValidator
  emailValidatorStub: EmailValidator
}

const makeSut = (): SutType => {
  const emailValidatorStub = new EmailValidatorStub()
  return {
    sut: new EmailFieldValidator('email', emailValidatorStub),
    emailValidatorStub
  }
}

describe('Email Field Validator', () => {
  test('should call EmailValidator with correct email', async () => {
    const { sut, emailValidatorStub } = makeSut()
    const isValidSpy = jest.spyOn(emailValidatorStub, 'isValid')

    sut.validate({ email: 'foo@example.com' })

    expect(isValidSpy).toBeCalledWith('foo@example.com')
  })

  test('should return InvalidParamError if an invalid email is provided', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockReturnValueOnce(false)

    const result = sut.validate({ email: 'foo@example.com' })
    expect(result).toEqual(new InvalidParamError('email'))
  })

  test('should return throw error if EmailValidator throws error', () => {
    const { sut, emailValidatorStub } = makeSut()
    jest.spyOn(emailValidatorStub, 'isValid').mockImplementationOnce(() => {
      throw new Error('')
    })

    expect(sut.validate).toThrow()
  })
})
