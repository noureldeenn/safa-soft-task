import React, { createContext, useReducer } from 'react'
import { initialValues } from './initialValues'

const isText = RegExp(/^[A-Z ]+$/i)
const isEmail = RegExp(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i)
const isPhone = RegExp(/^(\+201|01|00201)[0-2,5]{1}[0-9]{8}/)
const isNumber = RegExp(/^\d+$/)
const isPassword = RegExp(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)

// Applied to all fields
const variant = 'outlined'
const margin = 'normal'

export declare type ValidationSchema = Record<
  string,
  {
    value?: any
    error?: string
    required?: boolean
    validate?: 'text' | 'number' | 'email' | 'phone' | 'password' | 'confirmPassword' | 'select'
    minLength?: number
    maxLength?: number
    helperText?: string
  }
>

type ContextProps = {
  activeStep: number
  formValues: ValidationSchema
  handleChange: (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void
  handleNext: () => void
  handleBack: () => void
  variant: 'outlined' | 'standard' | 'filled'
  margin: 'dense' | 'normal' | 'none'
}

export const AppContext = createContext<ContextProps>({
  activeStep: 0,
  formValues: initialValues,
  handleChange() {},
  handleNext() {},
  handleBack() {},
  variant,
  margin
})

interface ProviderProps {
  children: React.ReactNode
}

type State = {
  activeStep: number
  formValues: ValidationSchema
}

type Action =
  | { type: 'increase' }
  | { type: 'decrease' }
  | { type: 'form-value'; name: string; fieldValue: any }
  | { type: 'form-error'; name: string; error: string }

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'increase':
      return {
        ...state,
        activeStep: state.activeStep + 1
      }
    case 'decrease':
      return {
        ...state,
        activeStep: state.activeStep - 1
      }
    case 'form-value':
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.name]: {
            ...state.formValues[action.name],
            value: action.fieldValue
          }
        }
      }
    case 'form-error':
      return {
        ...state,
        formValues: {
          ...state.formValues,
          [action.name]: {
            ...state.formValues[action.name],
            error: action.error
          }
        }
      }

    default:
      return state
  }
}

export function StepsProvider({ children }: ProviderProps) {
  const [{ activeStep, formValues }, dispatch] = useReducer(reducer, {
    activeStep: 0,
    formValues: initialValues
  })

  // Proceed to next step
  const handleNext = () => dispatch({ type: 'increase' })
  // Go back to prev step
  const handleBack = () => dispatch({ type: 'decrease' })

  // Handle form change
  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = event.target


    const fieldValue = value

    dispatch({ type: 'form-value', name, fieldValue })

    const fieldName = initialValues[name]
    if (!fieldName) return

    const { required, validate, minLength, maxLength, helperText } = fieldName

    let error = ''

    if (required && !fieldValue) error = 'This field is required'
    if (minLength && value && value.length < minLength) error = `Minimum ${minLength} characters is required.`
    if (maxLength && value && value.length > maxLength) error = 'Maximum length exceeded!'
    if (validate) {
      switch (validate) {
        case 'text':
          if (value && !isText.test(value)) error = helperText || 'This field accepts text only.'
          break

        case 'number':
          if (value && !isNumber.test(value)) error = helperText || 'This field accepts numbers only.'
          break

        case 'email':
          if (value && !isEmail.test(value)) error = helperText || 'Please enter a valid email address.'
          break

        case 'phone':
          if (value && !isPhone.test(value))
            error = helperText || 'Please enter a valid phone number. i.e: xxx-xxx-xxxx'
          break

        case 'password':
          if (value && !isPassword.test(value)) error = helperText || 'Please enter a valid password code.'
          break

        case 'confirmPassword':
          if (value && value !== formValues.password.value) {
            error = helperText || 'password code did not match.'
          } else if (value && !isPassword.test(value)) {
            error = helperText || 'Please enter a valid password code.'
          }
          break

        case 'select':
          if (!value) error = helperText || 'Please select a value.'
          break

        default:
          break
      }
    }

    dispatch({ type: 'form-error', name, error })
  }

  return (
    <AppContext.Provider value={{ activeStep, formValues, handleChange, handleNext, handleBack, variant, margin }}>
      <div className='mui-step-form'>{children}</div>
    </AppContext.Provider>
  )
}
