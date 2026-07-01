import i18next from 'i18next'
import React from 'react'
import { FieldValues } from 'react-hook-form'
import { KCFormManager } from '~components'
import { KCSingleSelect, KCTextField } from '~components/KCForm/components'
import { generateAction, unit } from '~shared/types/functions/data'

interface IRecommendationActionFeedbackProps<T extends FieldValues> {
  formManager: KCFormManager<T>
  value: number
  label: string
  sensorKey: keyof typeof unit
  input1Props: Pick<React.ComponentProps<typeof KCSingleSelect<T>>, 'name' | 'options'> // @ts-ignore
  input2Props: Pick<React.ComponentProps<typeof KCTextField<T>>, 'name'> // @ts-ignore
}

export function RecommendationActionFeedback<T extends FieldValues>(props: IRecommendationActionFeedbackProps<T>) {
  const { t } = i18next

  return (
    <div>
      <div className='font-semibold'>{props.label}</div>
      <div className='mt-2 flex flex-col gap-1'>
        <div className='flex items-center justify-between'>
          <div>{t('Hệ thống khuyến nghị')}</div>
          <div className='flex gap-1 text-sm'>
            <div className='flex h-[40px] w-[90px] items-center rounded-md bg-kc-alpha-20 px-3'>{generateAction({ t, value: props.value ?? 0 })}</div>
            <div className='flex h-[40px] w-[110px] items-center justify-between rounded-md bg-kc-alpha-20 px-3'>
              <div>{Math.abs(props.value)}</div>
              <div>{unit[props.sensorKey]}</div>
            </div>
          </div>
        </div>
        <div className='flex items-center justify-between'>
          <div>{t('Đề xuất thay đổi')}</div>
          <div className='flex gap-1'>
            <div className='flex h-[40px] w-[90px] items-center rounded-lg bg-kc-input'>
              <props.formManager.SingleSelect size='small' {...props.input1Props} sx={{ minWidth: 90 }} />
            </div>
            <div className='flex h-[40px] w-[110px] items-center justify-between rounded-lg bg-kc-input pr-3'>
              <props.formManager.TextField inputProps={{ style: { fontSize: '14px' } }} {...props.input2Props} size='small' sx={{ width: '100%', height: '100%' }} />
              <div>{unit[props.sensorKey]}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
