import { useTranslation } from 'react-i18next'
import { SensorDataIssue } from '~shared/types/functions/data'
import { renderIssueDataTime } from '../utils'

interface IWarningItemModalProps {
  closeModal: () => void
  issue: SensorDataIssue
}

function WarningItemModal(props: IWarningItemModalProps) {
  const { t } = useTranslation()

  return (
    <div className='flex flex-col gap-4 p-4'>
      <div>{renderIssueDataTime(props.issue)}</div>
      <div className='flex gap-1'>
        <div className='font-semibold'>{t('Warning')}:</div>
        <div className='font-bold text-red-500'>{t(props?.issue?.Warning ?? '')}</div>
      </div>
      <div className='flex gap-1'>
        <div className='font-semibold'>{t('InformationHasBeenReceived')}:</div>
        <div className='font-bold text-red-500'>{props.issue.Acknowledge ? t('Received') : t('NotReceived')}</div>
      </div>
      <div className='font-semibold'>{t('ReferenceInformation')}:</div>
      <ul className='ml-8 mt-[-12px]'>
        {props.issue?.Sources && props.issue?.Sources.length > 0 && props.issue?.Sources?.map((source: string, i: number) => <li key={i}>{t(source ?? '')}</li>)}
      </ul>
    </div>
  )
}

export default WarningItemModal
