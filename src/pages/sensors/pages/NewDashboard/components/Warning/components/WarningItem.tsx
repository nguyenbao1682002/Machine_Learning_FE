import classNames from 'classnames'
import React from 'react'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { KCButton, KCModal } from '~components'
import { KCModalActions } from '~components/KCModal/types'
import { KCModalWithHeaderLayout } from '~components/layouts/KCModalWithHeaderLayout'
import { SensorDataIssue } from '~shared/types/functions/data'
import { useUpdateAcknowledge } from '../apis/useUpdateAcknowledge'
import { renderIssueDataTime } from '../utils'
import WarningItemModal from './WarningItemModal'

interface WarningItemProps {
  issue: SensorDataIssue
  executeGetCachedLastSensorDataIssues: () => void
}

export const WarningItem = (props: WarningItemProps) => {
  const { t } = useTranslation()
  const updateAcknowledge = useUpdateAcknowledge()
  const modalRef = React.useRef<KCModalActions>(null)

  const handleConfirm = () => {
    updateAcknowledge.sendRequest(
      {
        Date: props.issue?.SensorDataInfo?.Date ?? props.issue?.Date,
        Time: props.issue?.SensorDataInfo?.Time,
        ID: props.issue?.ID,
      },
      {
        onSuccess: ({ data }) => {
          toast.success(t('Lưu thông tin thành công'))
          props.executeGetCachedLastSensorDataIssues()
        },
        onError: (error) => toast.error(error.response?.data.message ?? error.message),
      },
    )
  }

  return (
    <div className={props.issue.Acknowledge ? 'flex w-full flex-col gap-2 rounded bg-green-300' : 'flex w-full flex-col gap-2 rounded bg-red-300'}>
      <div className='mx-3 mt-2 font-semibold'>{renderIssueDataTime(props.issue)}</div>
      <div className='mx-3 font-semibold'>{t(props.issue?.Warning ?? '')}</div>
      <div className='mx-3 mb-2 flex justify-between'>
        <KCButton size='small' className={classNames('py-1.5', { hidden: props.issue.Acknowledge })} onClick={handleConfirm}>
          {t('InformationHasBeenReceived')}
        </KCButton>
        {/* Modal  */}
        <KCButton
          size='small'
          className='py-1.5'
          onClick={() => {
            modalRef.current?.open()
          }}
        >
          {t('ViewDetails')}
        </KCButton>
        <KCModal ref={modalRef}>
          <KCModalWithHeaderLayout headerTitle={t('ErrorDetails')}>
            <WarningItemModal closeModal={() => modalRef.current?.close()} issue={props.issue} />
          </KCModalWithHeaderLayout>
        </KCModal>
      </div>
    </div>
  )
}
