import { IQueryFeedbackResponse, IStatsFeedback } from '~shared/types/functions/data'
import { useGetFeedbackItem } from '../../apis/useGetFeedbackItem'
import { ParametersStatusFeedback } from './ParametersStatusFeedback'
import React from 'react'
import { VariablesStatusFeedback } from './VariablesStatusFeedback'
import { useGetAllStats } from '~pages/sensors/components/cards/CurrentStatus_Card/apis/useGetAllStats'
import ModalTable from '~pages/sensors/components/cards/CurrentStatus_Card/components/FeedbackModal/components/ModalTable'

interface IPlaybackModalProps {
  closeModal: () => void
  item: IQueryFeedbackResponse | undefined
}

function PlaybackModal(props: IPlaybackModalProps) {
  const getFeedbackItem = useGetFeedbackItem()
  const getAllStats = useGetAllStats()

  React.useEffect(() => {
    getFeedbackItem.sendRequest({
      Date: props.item?.Date.toString() ?? '',
      Hash: props.item?.Hash ?? '',
    })
  }, [props])

  React.useEffect(() => {
    getAllStats.sendRequest({ Date: props.item?.Date.toString() ?? '', Time: props.item?.Time.toString() })
  }, [props])

  return (
    <>
      <div className='fixed z-50 flex w-full justify-between gap-6 bg-kc-card p-6 shadow-md'>
        <div className='ml-8 flex h-10 items-center gap-2 font-medium'>
          <span className='text-lg'>Ngày phản hồi: </span>
          <div className='flex h-[40px] w-[120px] items-center rounded-md bg-kc-alpha-20 px-3 text-sm'>{getFeedbackItem.responseBody?.Date.toString()}</div>
        </div>
        <div className='flex h-10 items-center gap-2 font-medium'>
          <span className='text-lg'>Thời gian phản hồi: </span>
          <div className='flex h-[40px] w-[120px] items-center rounded-md bg-kc-alpha-20 px-3 text-sm'>{getFeedbackItem.responseBody?.Time.toString()}</div>
        </div>
        <div className='mr-8 flex h-10 items-center gap-2 font-medium'>
          <span className='text-lg'>Người phản hồi: </span>
          <div className='flex h-[40px] w-[120px] items-center rounded-md bg-kc-alpha-20 px-3 text-sm'>{getFeedbackItem.responseBody?.Feedback?.User}</div>
        </div>
      </div>
      <div className='mb-5 mt-24 flex max-h-full w-full gap-4 overflow-y-auto p-4'>
        <div className='grid w-full grid-cols-12 gap-4'>
          <div className='col-span-12 xl:col-span-4'>
            <div className='flex w-full flex-col gap-4'>
              <ParametersStatusFeedback label='Trạng thái lò' value={getFeedbackItem.responseBody?.Feedback?.GeneralStatus} />
              <ParametersStatusFeedback label='Xu hướng nhiệt đầu lò' value={getFeedbackItem.responseBody?.Feedback?.StatusInDetails?.KilnInletTemp} />
              <ParametersStatusFeedback label='Xu hướng oxy' value={getFeedbackItem.responseBody?.Feedback?.StatusInDetails?.GA02_Oxi} />
              <ParametersStatusFeedback label='Xu hướng Pyrometer' value={getFeedbackItem.responseBody?.Feedback?.StatusInDetails?.Pyrometer} />
              <ParametersStatusFeedback label='Xu hướng vôi tự do' value={getFeedbackItem.responseBody?.Feedback?.StatusInDetails?.CaO_f} />
              <ParametersStatusFeedback label='Xu hướng S03' value={getFeedbackItem.responseBody?.Feedback?.StatusInDetails?.S03_hot_meal} />
              <ParametersStatusFeedback label='Xu hướng Nox' value={getFeedbackItem.responseBody?.Feedback?.StatusInDetails?.Nox} />

              <div />

              <VariablesStatusFeedback
                label1='Điều chỉnh tốc độ quạt'
                status={getFeedbackItem.responseBody?.Feedback?.RecommendationActions?.FanSP?.Status}
                label2='Mức % đã phản hồi'
                value={getFeedbackItem.responseBody?.Feedback?.RecommendationActions?.FanSP?.ValueChange ?? ''}
              />
              <VariablesStatusFeedback
                label1='Điều chỉnh tốc độ cấp than'
                status={getFeedbackItem.responseBody?.Feedback?.RecommendationActions?.CoalSP?.Status}
                label2='Mức t/h đã phản hồi'
                value={getFeedbackItem.responseBody?.Feedback?.RecommendationActions?.CoalSP?.ValueChange ?? ''}
              />
              <VariablesStatusFeedback
                label1='Điều chỉnh tốc độ lò'
                status={getFeedbackItem.responseBody?.Feedback?.RecommendationActions?.FurnaceSpeedSP?.Status}
                label2='Mức rpm đã phản hồi'
                value={getFeedbackItem.responseBody?.Feedback?.RecommendationActions?.FurnaceSpeedSP?.ValueChange ?? ''}
              />
            </div>

            <div className='mt-4 flex flex-col gap-2'>
              <div className='font-semibold'>Ghi chú:</div>
              <textarea
                className='flex items-center rounded-md bg-kc-alpha-20 p-3 text-sm text-black'
                rows={4}
                cols={40}
                placeholder={getFeedbackItem.responseBody?.Feedback?.Note}
              ></textarea>
            </div>
          </div>

          <div className='col-span-12 w-full xl:col-span-8'>
            <ModalTable allStats={getAllStats.responseBody ?? []} />
          </div>
        </div>
      </div>
    </>
  )
}

export default PlaybackModal
