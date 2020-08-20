export type FieldValidatorType = (value: string) => string | undefined

export const required: FieldValidatorType = value => (value || typeof value === 'number' ? undefined : 'Required')
export const maxLength = (max: number): FieldValidatorType => (value) => value && value.length > max ? `Must be ${max} characters or less` : undefined
export const minLength = (min: number): FieldValidatorType => (value) => value && value.length < min ? `Must be ${min} characters or more` : undefined
//(www|http:|https:)+[^\s]+[\w]
export const url: FieldValidatorType = value =>
  value && !/(www|http:|https:)+[^\s]+[\w]/.test(value) ?
  'Invalid url address' : undefined