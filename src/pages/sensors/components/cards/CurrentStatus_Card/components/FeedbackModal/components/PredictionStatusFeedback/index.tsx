import i18next from 'i18next'
import { FieldValues } from 'react-hook-form'
import { KCFormManager } from '~components'
import { KCSingleSelect } from '~components/KCForm/components'

interface PredictionStatusFeedbackProps<T extends FieldValues> {
  label: string
  value: string | undefined
  formManager: KCFormManager<T>
  input1Props: Pick<React.ComponentProps<typeof KCSingleSelect<T>>, 'name' | 'options'>
}

export function PredictionStatusFeedback<T extends FieldValues>(props: PredictionStatusFeedbackProps<T>) {
  const { t } = i18next

  const trending = props.value === 'Stable' ? t('Ổn định') : props.value === 'Increasing' ? t('Tăng') : props.value === 'Decreasing' ? t('Giảm') : ''

  return (
    <div>
      <div className='font-semibold'>{props.label}</div>
      <div className='mt-2 flex flex-col gap-1'>
        <div className='flex items-center justify-between'>
          <div>{t('Hệ thống dự đoán')}</div>
          <div className='flex h-[40px] w-[120px] items-center rounded-md bg-kc-alpha-20 px-3 text-sm'>{trending}</div>
        </div>
        <div className='flex items-center justify-between'>
          <div>{t('Đề xuất thay đổi')}</div>

          <div className='flex h-[40px] w-[120px] items-center rounded-lg bg-kc-input'>
            <props.formManager.SingleSelect size='small' {...props.input1Props} sx={{ minWidth: 120 }} />
          </div>
        </div>
      </div>
    </div>
  )
}
