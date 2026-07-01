import { TextField, TextFieldProps } from '@mui/material'
import { Path, useFormContext, UseFormReturn } from 'react-hook-form'

type TKCTextFieldProps<IMEFormInput> = TextFieldProps & {
  name: Path<IMEFormInput>
}

export function KCTextField<IMEFormInput>(props: TKCTextFieldProps<IMEFormInput>) {
  const formMethods: UseFormReturn = useFormContext()
  const { name, onBlur, ...otherProps } = props
  return <TextField {...otherProps} {...formMethods.register(name, { onBlur })} />
}
