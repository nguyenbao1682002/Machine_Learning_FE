import styled from '@emotion/styled'
import { TextField, TextFieldProps } from '@mui/material'
import { Path, useFormContext, UseFormReturn } from 'react-hook-form'

type TKCRangeNumberProps<IMEFormInput> = Omit<TextFieldProps, 'name'> & {
  minName: Path<IMEFormInput>
  maxName: Path<IMEFormInput>
}

const SDiv_Container = styled.div`
  & fieldset {
    border: none;
  }
`

export function KCRangeNumber<IMEFormInput>(props: TKCRangeNumberProps<IMEFormInput>) {
  const formMethods: UseFormReturn = useFormContext()
  const { minName, maxName, ...otherProps } = props
  return (
    <SDiv_Container className='rounded-system-default focus-within:border-system-highlight flex h-8 items-center gap-1 border-[1px] border-[#0000003b] focus-within:border-[2px]'>
      <TextField placeholder='Min' inputProps={{ style: { textAlign: 'center' } }} {...otherProps} {...formMethods.register(minName)} />
      <div className='text-system-tertiary'>-</div>
      <TextField placeholder='Max' inputProps={{ style: { textAlign: 'center' } }} {...otherProps} {...formMethods.register(maxName)} />
    </SDiv_Container>
  )
}
