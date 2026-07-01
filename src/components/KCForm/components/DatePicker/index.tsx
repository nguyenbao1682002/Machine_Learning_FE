import { TextFieldProps } from '@mui/material'
import { DatePicker, DatePickerProps, LocalizationProvider } from '@mui/x-date-pickers'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from 'dayjs'
import { Controller, Path, useFormContext, UseFormReturn } from 'react-hook-form'
import * as BiIcons from 'react-icons/bi'
import { DATE_TIME_FORMAT } from '~shared/constants'

type TKCDatePickerProps<IMEFormInput> = Omit<DatePickerProps<any>, 'onChange' | 'value' | 'id' | 'name' | 'renderInput'> & {
  name: Path<IMEFormInput>
  renderInputProps?: TextFieldProps
}

export default function KCDatePicker<IMEFormInput>(props: TKCDatePickerProps<IMEFormInput>) {
  const formMethods: UseFormReturn = useFormContext()
  const { name, renderInputProps, ...otherDatePickerProps } = props
  return (
    <Controller
      control={formMethods.control}
      name={name}
      rules={
        {
          // validate: {
          //   min: (date) => isFuture(date) || "Please, enter a future date"
          // }
        }
      }
      render={({ field, fieldState }) => {
        return (
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              {...field}
              {...otherDatePickerProps}
              value={dayjs(field.value) || null}
              inputRef={field.ref}
              slots={{
                openPickerIcon: BiIcons.BiCalendar,
              }}
              sx={{
                '.MuiInputBase-input': {
                  height: '1rem',
                },
                ...(renderInputProps?.sx as any),
              }}
              format={DATE_TIME_FORMAT}
            />
          </LocalizationProvider>
        )
      }}
    />
  )
}
