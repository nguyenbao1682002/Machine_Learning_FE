import { FieldValues } from 'react-hook-form'
import React from 'react'

interface ParametersStatusFeedbackProps {
  label: string
  value: string | undefined
}

export function ParametersStatusFeedback(props: ParametersStatusFeedbackProps) {
  const trending =
    props.value === 'Stable'
      ? 'Ổn định'
      : props.value === 'Increasing'
      ? 'Tăng'
      : props.value === 'Decreasing'
      ? 'Giảm'
      : props.value === 'Weak'
      ? 'Yếu'
      : props.value === 'Hot'
      ? 'Nóng, sáng'
      : props.value === 'Dirty'
      ? 'Lò bui'
      : ''

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center justify-between'>
        <div>{props.label}</div>
        <div className='flex h-[40px] w-[120px] items-center rounded-md bg-kc-alpha-20 px-3 text-sm'>{trending}</div>
      </div>
    </div>
  )
}
