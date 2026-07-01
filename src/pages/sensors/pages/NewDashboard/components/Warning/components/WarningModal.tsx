import dayjs from 'dayjs'
import React from 'react'
import { useForm } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { KCFormManager } from '~components'
import { useQuerySensorData } from '../apis/useQuerySensorData'
import { WarningItem } from './WarningItem'

interface IWarningItemModalProps {
  closeModal: () => void
  executeGetCachedLastSensorDataIssues: () => void
}

interface IForm {
  Date: Date
  TimeStart: Date
  TimeEnd: Date
}

const formManager = new KCFormManager<IForm>()

export function WarningModal(props: IWarningItemModalProps) {
  const defaultValues: IForm = React.useMemo(
    () => ({
      Date: dayjs().toDate(),
      TimeStart: dayjs().toDate(),
      TimeEnd: dayjs().toDate(),
    }),
    [],
  )

  const form = useForm<IForm>({ defaultValues })
  const formValues = form.watch()
  const { t } = useTranslation()

  const getListOfIssues = useQuerySensorData()

  const queryDate = dayjs.tz(formValues.Date).format('YYYY-MM-DD')
  const queryTimeStart = dayjs.tz(formValues.TimeStart).format('HH:mm:00')
  const queryTimeEnd = dayjs.tz(formValues.TimeEnd).format('HH:mm:00')

  React.useEffect(() => {
    getListOfIssues.sendRequest({ Date: queryDate, Time: { between: [queryTimeStart, queryTimeEnd] } })
  }, [queryDate, queryTimeStart, queryTimeEnd])

  return (
    <formManager.Form form={form} defaultValues={defaultValues} className='overflow-y-scroll rounded-kc-primary'>
      <div className='flex w-full justify-between gap-4 rounded-kc-primary bg-kc-card p-6 shadow-md'>
        <div className='flex h-10 items-center gap-4 font-medium'>
          <span className='items-center justify-center'>{t('SelectErrorOccurrenceDate')}:</span>
          <formManager.DatePicker
            name='Date'
            renderInputProps={{
              sx: {
                '.MuiInputBase-input': {
                  height: '0.5rem',
                  fontSize: '0.875rem',
                },
              },
            }}
            className='w-40'
            maxDate={dayjs().endOf('day')}
          />
        </div>
        <div className='flex gap-10'>
          <div className='flex h-10 items-center gap-3 font-medium'>
            <span>{t('From')}</span>
            <formManager.TimePicker
              name='TimeStart'
              renderInputProps={{
                sx: {
                  '.MuiInputBase-input': {
                    height: '0.5rem',
                    fontSize: '0.875rem',
                  },
                },
              }}
              className='w-28'
              maxTime={dayjs(formValues.Date).diff(dayjs(), 'days') === 0 ? dayjs(formValues.Date) : undefined}
            />
          </div>
          <div className='flex h-10 items-center gap-3 font-medium'>
            <span>{t('To')}</span>
            <formManager.TimePicker
              name='TimeEnd'
              renderInputProps={{
                sx: {
                  '.MuiInputBase-input': {
                    height: '0.5rem',
                    fontSize: '0.875rem',
                  },
                },
              }}
              className='w-28'
              maxTime={dayjs(formValues.Date).diff(dayjs(), 'days') === 0 ? dayjs(formValues.Date) : undefined}
            />
          </div>
        </div>
      </div>

      <div className='mt-24'>
        {getListOfIssues.responseBody === undefined || getListOfIssues.responseBody?.length === 0 ? (
          <div className='my-[24.5rem] h-full p-4 text-center font-semibold'>{t('NoErrors')}</div>
        ) : (
          <div className='w-full'>
            {getListOfIssues.responseBody &&
              getListOfIssues.responseBody?.length > 0 &&
              getListOfIssues.responseBody?.map((issue, index) => (
                <div key={index}>
                  {issue && issue.Issues && issue.Issues.length > 0 && (
                    <div key={index} className='grid w-full grid-cols-12 gap-4 p-4'>
                      {issue &&
                        issue.Issues &&
                        issue.Issues.length > 0 &&
                        typeof issue.Issues !== 'string' &&
                        issue.Issues.map((issue, i) => (
                          <div key={i} className='col-span-12 xl:col-span-3'>
                            <WarningItem issue={issue} {...props} />
                          </div>
                        ))}
                    </div>
                  )}
                </div>
              ))}
          </div>
        )}
      </div>
    </formManager.Form>
  )
}
