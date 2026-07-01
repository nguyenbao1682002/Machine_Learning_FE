import { Slider, SliderProps } from '@mui/material'
import { Controller, Path, useFormContext, UseFormReturn } from 'react-hook-form'

type TKCSliderProps<IMEFormInput> = SliderProps & {
  name: Path<IMEFormInput>
}

export function KCSlider<IMEFormInput>(props: TKCSliderProps<IMEFormInput>) {
  const formMethods: UseFormReturn = useFormContext()
  const { name, ...otherProps } = props

  return (
    <Controller
      control={formMethods.control}
      name={name}
      render={({ field }) => {
        const { value, ...otherFieldValues } = field
        return <Slider aria-label={name} value={value ?? 0} {...otherProps} {...otherFieldValues} />
      }}
    />
  )
}
