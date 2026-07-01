import { Switch, SwitchProps } from '@mui/material'
import { Path, useFormContext, UseFormReturn } from 'react-hook-form'

type TKCSwitchProps<IMEFormInput> = SwitchProps & {
  name: Path<IMEFormInput>
}

export default function KCSwitch<IMEFormInput>(props: TKCSwitchProps<IMEFormInput>) {
  const formMethods: UseFormReturn = useFormContext()
  const { name, ...otherProps } = props
  return <Switch {...otherProps} {...formMethods.register(name)} />
}
