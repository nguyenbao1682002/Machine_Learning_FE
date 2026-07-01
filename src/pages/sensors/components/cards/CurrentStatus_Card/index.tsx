import classNames from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { KCButton, KCCard, KCModal } from '~components'
import { KCModalActions } from '~components/KCModal/types'
import { KCModalWithHeaderLayout } from '~components/layouts/KCModalWithHeaderLayout'
import { ISensorData } from '~shared/types/functions/data'
import { useCurrentStatusI18n } from '~translation/index'
import Modal from './components/FeedbackModal'

interface IPredictionProps {
  currentData: ISensorData | undefined
  currentTime: string
  isLoading: boolean
}

CurrentStatus_Card.defaultProps = {
  isLoading: false,
}

export default function CurrentStatus_Card(props: IPredictionProps) {
  const { t } = useTranslation()
  const modalRef = React.useRef<KCModalActions>(null)
  const currentStatusI18n = useCurrentStatusI18n()

  const prediction = props.currentData?.Prediction

  const generateCardContent = () => {
    if (prediction && Object.keys(prediction).length > 0) {
      const currentStatuses = Object.entries(props.currentData?.Prediction?.StatusInDetails ?? {}).map(([key, value]) => currentStatusI18n.translate(key, value))
      return (
        <>
          <div className='mt-4 text-center font-semibold'>{t('CurrentStatus')?.toUpperCase()}</div>
          <div className='mt-5 flex justify-center gap-2'>
            <span>{t('Trạng thái lò')}: </span>
            <span className={classNames('font-semibold', props.currentData?.Prediction?.GeneralStatus === 'Stable' ? 'text-green-600' : 'text-red-600')}>
              {t(props.currentData?.Prediction?.GeneralStatus ?? '')}
            </span>
          </div>
          {/* A Hiếu kêu show lên lại (8 January 2024 10h22 Finnish Time) */}
          <ul className='mt-5 flex flex-col justify-center gap-4 pl-8 pr-4'>
            {currentStatuses.map((status, idx) => (
              <li className={status.includes('tăng') === true || status.includes('giảm') === true ? 'font-semibold text-red-600' : 'font-semibold text-green-600'} key={idx}>
                {status}
              </li>
            ))}
          </ul>

          {/* Modal */}
          <div className='mt-4 px-4'>
            <KCButton
              onClick={() => {
                modalRef.current?.open()
              }}
              size='small'
              className='py-1.5'
            >
              {t('Phản hồi người dùng')}
            </KCButton>
          </div>

          <KCModal ref={modalRef} size={{ width: 'min(80rem, calc(100vw - 2rem))', height: 'min(60rem, calc(100vh - 2rem))' }}>
            <KCModalWithHeaderLayout headerTitle={t('Phản hồi cho dữ liệu')}>
              <Modal closeModal={() => modalRef.current?.close()} />
            </KCModalWithHeaderLayout>
          </KCModal>
        </>
      )
    } else {
      return (
        <>
          <div className='mt-4 text-center font-semibold'>{t('CurrentStatus')?.toUpperCase()}</div>
          <div className='my-5 flex items-center justify-center'>
            <div>{t('NoDataAvailable')}</div>
          </div>
        </>
      )
    }
  }

  return (
    <KCCard isLoading={props.isLoading} className='min-h-[14rem]'>
      {generateCardContent()}
    </KCCard>
  )
}
