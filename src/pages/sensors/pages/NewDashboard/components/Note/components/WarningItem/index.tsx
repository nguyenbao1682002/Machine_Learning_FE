import dayjs from 'dayjs'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { KCButton, KCModal } from '~components'
import { KCModalActions } from '~components/KCModal/types'
import { KCModalWithHeaderLayout } from '~components/layouts/KCModalWithHeaderLayout'
import { Warning } from '~shared/types/functions/data'
interface WarningItemProps {
  warning: Warning
}
export function WarningItem(props: WarningItemProps) {
  const { t } = useTranslation()
  const modalRef = React.useRef<KCModalActions>(null)

  return (
    <React.Fragment>
      <div className='flex items-center gap-4 rounded-lg bg-[#ff910022] p-3'>
        <div className='flex flex-col gap-1'>
          <div className='text-base font-medium text-[#d68d2f]'>{t(props.warning.description)}</div>
          <div className='text-sm text-kc-secondary'>{dayjs(props.warning.datetime).format('DD/MM/YYYY HH:mm A')}</div>
          <div className='mt-1'>
            <KCButton size='small' className='py-1.5' onClick={modalRef.current?.open}>
              {t('ViewDetails')}
            </KCButton>
          </div>
        </div>
      </div>
      <KCModal ref={modalRef}>
        <KCModalWithHeaderLayout headerTitle={t('Chi tiết nhắc nhở')}>
          <div className='flex flex-col gap-2 p-4'>
            <div>
              <span className='font-semibold'>{t('Logic')}: </span>
              <span>{t(props.warning.logic)}</span>
            </div>
            <div>
              <span className='font-semibold'>{t('Nhắc nhở')}: </span>
              <span>{t(props.warning.description)}</span>
            </div>
            <div>
              <span className='font-semibold'>{t('Ngày giờ')}: </span>
              <span>{dayjs(props.warning.datetime).format('DD/MM/YYYY HH:mm A')}</span>
            </div>
            <div>
              <span className='font-semibold'>{t('Đối tượng')}: </span>
              <span>{t(props.warning.target)}</span>
            </div>
          </div>
        </KCModalWithHeaderLayout>
      </KCModal>
    </React.Fragment>
  )
}
