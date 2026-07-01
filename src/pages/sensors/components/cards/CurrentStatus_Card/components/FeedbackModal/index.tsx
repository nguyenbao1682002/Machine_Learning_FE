import dayjs from 'dayjs'
import { t } from 'i18next'
import React from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import { KCButton, KCFormManager } from '~components'
import { IStatsFeedback } from '~shared/types/functions/data'
import { useGetAllStats } from '../../apis/useGetAllStats'
import { useSaveAllStats } from '../../apis/useSaveAllStats'
import ModalTable from './components/ModalTable'
import { PredictionStatusFeedback } from './components/PredictionStatusFeedback'
import { RecommendationActionFeedback } from './components/RecommendationActionFeedback'

const formManager = new KCFormManager<IStatsFeedback>()

const options1 = [
  {
    value: '',
    label: '-',
  },
  {
    value: 'Stable',
    label: 'Ổn định',
  },
  {
    value: 'Weak',
    label: 'Yếu',
  },
  {
    value: 'Hot',
    label: 'Nóng, sáng',
  },
  {
    value: 'Dirty',
    label: 'Lò bụi',
  },
]

const options2 = [
  {
    value: '',
    label: '-',
  },
  {
    value: 'Stable',
    label: 'Ổn định',
  },
  {
    value: 'Increasing',
    label: 'Tăng',
  },
  {
    value: 'Decreasing',
    label: 'Giảm',
  },
]

const options3 = [
  {
    value: '',
    label: '-',
  },
  {
    value: 'Stable',
    label: 'Ổn định',
  },
  {
    value: 'Increase',
    label: 'Tăng',
  },
  {
    value: 'Decrease',
    label: 'Giảm',
  },
]

interface IFeedbackModalProps {
  closeModal: () => void
}

function FeedbackModal(props: IFeedbackModalProps) {
  const defaultValues: IStatsFeedback = React.useMemo(
    () => ({
      Date: dayjs().toDate(),
      Time: dayjs().toDate(),
      Feedback: {
        GeneralStatus: '',
        RecommendationActions: {
          CoalSP: {
            Status: '',
            ValueChange: '',
          },
          FurnaceSpeedSP: {
            Status: '',
            ValueChange: '',
          },
          FanSP: {
            Status: '',
            ValueChange: '',
          },
        },
        StatusInDetails: {
          Pyrometer: '',
          GA02_Oxi: '',
          KilnInletTemp: '',
        },
        Note: '',
        User: '',
      },
    }),
    [],
  )
  const form = useForm<IStatsFeedback>({ defaultValues })
  const formValues = form.watch()
  const getAllStats = useGetAllStats()

  const saveInfo = useSaveAllStats()

  const queryDate = dayjs.tz(formValues.Date).format('YYYY-MM-DD')
  const queryTime = dayjs.tz(formValues.Time).format('HH:mm:00')

  React.useEffect(() => {
    getAllStats.sendRequest({ Date: queryDate, Time: queryTime })
  }, [queryDate, queryTime])

  const handleSaveStatsFeedback = React.useCallback(
    (data: IStatsFeedback) => {
      saveInfo.sendRequest(
        {
          ...data,
          Date: queryDate,
          Time: queryTime,
        },
        {
          onSuccess: ({ data }) => {
            toast.success(t('Lưu thông tin thành công'))
            props.closeModal()
          },
          onError: (error) => toast.error(error.response?.data.message ?? error.message),
        },
      )
    },
    [queryTime, queryDate],
  )

  return (
    <formManager.Form onSubmit={handleSaveStatsFeedback} form={form} defaultValues={defaultValues} className='overflow-y-scroll rounded-kc-primary'>
      <div className='flex w-full justify-between gap-6 border-b border-kc-primary bg-kc-card p-6 text-sm'>
        <div className='flex h-10 items-center gap-2 font-medium'>
          <span>Thời điểm: </span>
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
          <formManager.TimePicker
            name='Time'
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
        <div className='flex h-10 items-center gap-2 font-medium'>
          <span>{t('Người phản hồi')}: </span>
          <formManager.TextField
            required
            name='Feedback.User'
            placeholder={t('Tên người phản hồi')}
            size='small'
            sx={{
              '.MuiInputBase-root': {
                padding: '0.5rem 0rem',
              },
              '.MuiInputBase-input': {
                height: '0.5rem',
                fontSize: '0.875rem',
              },
            }}
          />
        </div>
      </div>

      {getAllStats.responseBody?.length === 0 ? (
        <div className='my-[25rem] max-h-full w-full p-4 text-center text-base font-semibold'>{t('NoDataAvailable')}</div>
      ) : (
        <div className='flex max-h-full w-full gap-4 p-4'>
          <div className='grid w-full grid-cols-12 gap-4'>
            <div className='col-span-12 xl:col-span-4'>
              <div className='flex w-full flex-col gap-4'>
                <PredictionStatusFeedback<IStatsFeedback>
                  label={t('Trạng thái lò')}
                  value={getAllStats.responseBody?.[0].Prediction?.GeneralStatus}
                  input1Props={{ name: 'Feedback.GeneralStatus', options: options1 }}
                  formManager={formManager}
                />
                <PredictionStatusFeedback
                  label={t('Xu hướng nhiệt đầu lò')}
                  value={getAllStats.responseBody?.[0].Prediction?.StatusInDetails.KilnInletTemp}
                  input1Props={{ name: 'Feedback.StatusInDetails.KilnInletTemp', options: options2 }}
                  formManager={formManager}
                />
                <PredictionStatusFeedback
                  label={t('Xu hướng Pyrometer')}
                  value={getAllStats.responseBody?.[0].Prediction?.StatusInDetails.Pyrometer}
                  input1Props={{ name: 'Feedback.StatusInDetails.Pyrometer', options: options2 }}
                  formManager={formManager}
                />
                <PredictionStatusFeedback
                  label={t('Xu hướng Oxy')}
                  value={getAllStats.responseBody?.[0].Prediction?.StatusInDetails.GA02_Oxi}
                  input1Props={{ name: 'Feedback.StatusInDetails.GA02_Oxi', options: options2 }}
                  formManager={formManager}
                />
                <PredictionStatusFeedback
                  label={t('Xu hướng NOx')}
                  value={getAllStats.responseBody?.[0].Prediction?.StatusInDetails.Nox}
                  input1Props={{ name: 'Feedback.StatusInDetails.Nox', options: options2 }}
                  formManager={formManager}
                />
                <PredictionStatusFeedback
                  label={t('Xu hướng vôi tự do')}
                  value={getAllStats.responseBody?.[0].Prediction?.StatusInDetails.CaO_f}
                  input1Props={{ name: 'Feedback.StatusInDetails.CaO_f', options: options2 }}
                  formManager={formManager}
                />
                <PredictionStatusFeedback
                  label={t('Xu hướng SO3')}
                  value={getAllStats.responseBody?.[0].Prediction?.StatusInDetails.S03_hot_meal}
                  input1Props={{ name: 'Feedback.StatusInDetails.S03_hot_meal', options: options2 }}
                  formManager={formManager}
                />

                <div />
                <RecommendationActionFeedback<IStatsFeedback>
                  label={t('Tốc độ quạt')}
                  input1Props={{
                    name: 'Feedback.RecommendationActions.FanSP.Status',
                    options: options3,
                  }}
                  input2Props={{
                    name: 'Feedback.RecommendationActions.FanSP.ValueChange',
                  }}
                  value={getAllStats.responseBody?.[0].Prediction?.RecommendationActions.FanSP ?? 0}
                  sensorKey='FanSP'
                  formManager={formManager}
                />

                <RecommendationActionFeedback<IStatsFeedback>
                  label={t('Tốc độ cấp than')}
                  input1Props={{
                    name: 'Feedback.RecommendationActions.CoalSP.Status',
                    options: options3,
                  }}
                  input2Props={{
                    name: 'Feedback.RecommendationActions.CoalSP.ValueChange',
                  }}
                  value={getAllStats.responseBody?.[0].Prediction?.RecommendationActions.FanSP ?? 0}
                  sensorKey='CoalSP'
                  formManager={formManager}
                />

                <RecommendationActionFeedback<IStatsFeedback>
                  label={t('Tốc độ lò')}
                  input1Props={{
                    name: 'Feedback.RecommendationActions.FurnaceSpeedSP.Status',
                    options: options3,
                  }}
                  input2Props={{
                    name: 'Feedback.RecommendationActions.FurnaceSpeedSP.ValueChange',
                  }}
                  value={getAllStats.responseBody?.[0].Prediction?.RecommendationActions.FanSP ?? 0}
                  sensorKey='FurnaceSpeedSP'
                  formManager={formManager}
                />
                <div />
              </div>
            </div>
            <div className='col-span-12 w-full xl:col-span-8'>
              <ModalTable allStats={getAllStats.responseBody ?? []} />
              <div className='mt-4 flex flex-col gap-2'>
                <div className='font-semibold'>{t('Ghi chú')}:</div>
                <formManager.TextAreaAutosize
                  name='Feedback.Note'
                  minRows={4}
                  cols={40}
                  className='text-sm'
                  placeholder={t('Sự kiện khác của lò ? Cảm biến hỏng ?')}
                ></formManager.TextAreaAutosize>
              </div>
              <KCButton type='submit' className='float-right mt-4 hover:opacity-80'>
                {t('Lưu lại')}
              </KCButton>
            </div>
          </div>
        </div>
      )}
    </formManager.Form>
  )
}

export default FeedbackModal
