import styled from '@emotion/styled'
import { Autocomplete, AutocompleteProps, Checkbox } from '@mui/material'
import classNames from 'classnames'
import React from 'react'
import { Controller, Path, useFormContext, UseFormReturn } from 'react-hook-form'
import { IInputOption } from '~components/KCForm/types'
import { KCTextField } from '../TextField'

type TKCMultipleSelectProps<IKCFormInput> = Omit<AutocompleteProps<any, any, any, any>, 'onChange' | 'options' | 'renderInput'> & {
  name: Path<IKCFormInput>
  options: IInputOption[]
  onChange?: React.SelectHTMLAttributes<HTMLSelectElement>['onChange']
  placeholder: string
  dropdownStyle: React.CSSProperties
}

KCMultipleSelect.defaultProps = {
  placeholder: 'Select your option',
  dropdownStyle: {
    maxHeight: '15rem',
  },
}

const SSelectContainer = styled.div`
  & .MuiInputBase-root.MuiInputBase-sizeSmall {
    height: auto;
    min-height: 2.5rem;
    font-size: 0.875rem;
  }
`

export function KCMultipleSelect<IKCFormInput>(props: TKCMultipleSelectProps<IKCFormInput>) {
  const formMethods: UseFormReturn = useFormContext()
  const { name, options, onChange, placeholder, dropdownStyle, ...otherProps } = props

  const mapOptionKeyToLabel: Record<string, IInputOption['label']> = React.useMemo(() => {
    return options.reduce((prev, current) => ({ ...prev, [String(current.value)]: current.label }), {})
  }, [options])

  const handleChange = (event: React.SyntheticEvent<Element, Event>, value: string | string[] | null) => {
    formMethods.setValue(name, value as any)
  }

  return (
    <Controller
      control={formMethods.control}
      name={name}
      render={({ field }) => {
        const arrValue = field.value as string[]
        return (
          <SSelectContainer>
            <Autocomplete
              multiple
              value={arrValue ?? []}
              ListboxProps={{ style: dropdownStyle }}
              defaultValue={[]}
              options={Object.keys(mapOptionKeyToLabel)}
              disableCloseOnSelect
              getOptionLabel={(optionKey: string) => mapOptionKeyToLabel[optionKey] ?? ''}
              renderOption={(renderProps, optionKey, { selected }) => (
                <li {...renderProps}>
                  <Checkbox style={{ marginRight: 12, padding: 0 }} checked={selected} />
                  <span className={classNames({ 'text-sm': props.size === 'small' })}>{mapOptionKeyToLabel[optionKey] ?? ''}</span>
                </li>
              )}
              isOptionEqualToValue={(option, value) => {
                return value === option
              }}
              {...otherProps}
              renderInput={(params) => <KCTextField {...(params as any)} placeholder={placeholder ?? ''} />}
              onChange={handleChange}
            />
          </SSelectContainer>
        )
      }}
    />
  )
}
