import styled from '@emotion/styled'
import { FormControl, MenuItem, Select, SelectProps } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import { Path, UseFormReturn, useFormContext } from 'react-hook-form'
import { IInputOption } from '../../types'

type TKCSingleSelectProps<IMEFormInput> = Omit<SelectProps, 'onChange'> & {
  name: Path<IMEFormInput>
  options: IInputOption[]
  placeholder: React.ReactNode
  onChange?: React.SelectHTMLAttributes<HTMLSelectElement>['onChange']
  submitOnChange: boolean
}

KCSingleSelect.defaultProps = {
  placeholder: 'Select your option',
  displayEmpty: true,
  submitOnChange: false,
}

const SOption = styled.option``

export function KCSingleSelect<IMEFormInput>(props: TKCSingleSelectProps<IMEFormInput>) {
  const formMethods = useFormContext() as UseFormReturn

  const { name, options, onChange, submitOnChange, className, multiple, placeholder, ...otherProps } = props
  const value = formMethods.watch(name)
  const isShowPlaceHolder = options.findIndex((opt) => String(opt.value) === String(value)) === -1
  const OptionElement = props.native === true ? SOption : MenuItem

  const handleOnChange: React.ChangeEventHandler<HTMLSelectElement> = (event) => {
    if (typeof onChange === 'function') {
      onChange(event)
    }
    if (submitOnChange) {
      // console.log('submitOnChange')
      // @ts-ignore
      formMethods.submit()
    }
  }

  return (
    <div className='relative'>
      <FormControl fullWidth>
        <Select
          className={classNames('w-full bg-transparent text-sm text-black focus:border-transparent focus:outline-none', className)}
          // MenuProps={MenuProps}
          {...otherProps}
          {...formMethods.register(name, { onChange: handleOnChange })}
          value={value}
        >
          {isShowPlaceHolder && (
            <OptionElement value='' disabled>
              {placeholder}
            </OptionElement>
          )}

          {options.map((option, idx) => {
            const { label, value, ...optionProps } = option
            return (
              <OptionElement key={idx} value={String(value)} {...optionProps}>
                {option.label}
              </OptionElement>
            )
          })}
        </Select>
      </FormControl>
    </div>
  )
}
