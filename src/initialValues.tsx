import { ValidationSchema } from './Context'

export const initialValues: ValidationSchema = {
  fullName: {
    value: '',
    error: '',
    required: true,
    validate: 'text',
    minLength: 2,
    maxLength: 20,
    helperText: 'Custom error message'
  },
  email: {
    value: '',
    error: '',
    validate: 'email'
  },
  country: {
    value: '',
    error: '',
    validate: 'select'
  },
  phone: {
    value: '',
    error: '',
    validate: 'phone',
    maxLength: 15
  },
  password:{
    value: '',
    error: '',
    validate: 'password',
  },
  confirmPassword:{
    value: '',
    error: '',
    validate: 'confirmPassword',
  },
  address: {
    value: '',
    error: '',
    required: true,
    minLength: 10,
    maxLength: 80,
    helperText: 'Custom error message'
  },
  companyName: {
    value: '',
    error: '',
    required: true,
    minLength: 3,
    maxLength: 20,
    helperText: 'Custom error message'
  },
  city: {
    value: '',
    error: '',
    validate: 'select'
  },
  companyPhone: {
    value: '',
    error: '',
    validate: 'phone',
    maxLength: 15
  },
  companyLogo: {
    value: ''
  },
}
