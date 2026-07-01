import { TextFieldProps } from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { TimePicker, TimePickerProps } from '@mui/x-date-pickers/TimePicker'

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { Controller, Path, useFormContext, UseFormReturn } from 'react-hook-form'
import { HHMM_FORMAT } from '~shared/constants'

type TKCTimePickerProps<IMEFormInput> = Omit<TimePickerProps<any>, 'onChange' | 'value' | 'id' | 'name' | 'renderInput'> & {
  name: Path<IMEFormInput>
  renderInputProps?: TextFieldProps
}

export default function KCTimePicker<IMEFormInput>(props: TKCTimePickerProps<IMEFormInput>) {
  const formMethods: UseFormReturn = useFormContext()
  const { name, renderInputProps, ...otherDatePickerProps } = props
  return (
    <Controller
      control={formMethods.control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <TimePicker
              {...field}
              {...otherDatePickerProps}
              timeSteps={{ hours: 1, minutes: 1 }}
              value={dayjs(field.value) || null}
              ampm={false}
              inputRef={field.ref}
              sx={{
                '.MuiInputBase-input': {
                  height: '1rem',
                },
                ...renderInputProps?.sx,
              }}
              format={HHMM_FORMAT}
            />
          </LocalizationProvider>
        )
      }}
    />
  )
}
