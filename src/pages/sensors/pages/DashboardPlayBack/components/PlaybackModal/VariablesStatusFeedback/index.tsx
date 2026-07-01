import { FieldValues } from 'react-hook-form'
import React from 'react'

interface VariablesStatusFeedbackProps {
  label1: string
  label2: string
  status: string | undefined
  value: string
}

export function VariablesStatusFeedback(props: VariablesStatusFeedbackProps) {
  const trending = props.status === 'Stable' ? 'Ổn định' : props.status === 'Increase' ? 'Tăng' : props.status === 'Decrease' ? 'Giảm' : ''

  return (
    <div className='flex flex-col gap-1'>
      <div className='flex items-center justify-between'>
        <div>{props.label1}</div>
        <div className='flex h-[40px] w-[120px] items-center rounded-md bg-kc-alpha-20 px-3 text-sm'>{trending}</div>
      </div>
      <div className='flex items-center justify-between'>
        <div>{props.label2}</div>
        <div className='flex h-[40px] w-[120px] items-center rounded-md bg-kc-alpha-20 px-3 text-sm'>{props.value}</div>
      </div>
    </div>
  )
}
