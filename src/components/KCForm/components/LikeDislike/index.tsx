import { TextFieldProps } from '@mui/material'
import { Controller, Path, useFormContext, UseFormReturn } from 'react-hook-form'
import * as RiIcons from 'react-icons/ri'

type TKCLikeDislikeProps<IMEFormInput> = TextFieldProps & {
  name: Path<IMEFormInput>
}

export function KCLikeDislike<IMEFormInput>(props: TKCLikeDislikeProps<IMEFormInput>) {
  const formMethods: UseFormReturn = useFormContext()
  const { name } = props

  const toggleLikeStatus = (status: boolean) => {
    const CurrentStatus_Card: boolean | null = formMethods.watch(name)
    if (CurrentStatus_Card === status) {
      formMethods.setValue(name, null as any)
    } else {
      formMethods.setValue(name, status as any)
    }
  }

  return (
    <Controller
      control={formMethods.control}
      name={name}
      render={({ field, fieldState }) => {
        return (
          <div className='flex items-center gap-1'>
            <div className='flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full hover:bg-kc-alpha-10' onClick={() => toggleLikeStatus(true)}>
              {field.value === true ? <RiIcons.RiThumbUpFill className='text-kc-highlight' /> : <RiIcons.RiThumbUpLine />}
            </div>
            <div className='flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full hover:bg-kc-alpha-10' onClick={() => toggleLikeStatus(false)}>
              {field.value === false ? <RiIcons.RiThumbDownFill className='text-kc-highlight' /> : <RiIcons.RiThumbDownLine />}
            </div>
          </div>
        )
      }}
    />
  )
}
