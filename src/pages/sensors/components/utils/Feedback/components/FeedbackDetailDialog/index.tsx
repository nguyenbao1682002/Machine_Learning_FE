import React from 'react'
import { DeepPartial } from 'react-hook-form'
import { useTranslation } from 'react-i18next'
import { toast } from 'react-toastify'
import { KCButton, KCFormManager } from '~components'
import RootDialogScreenContext from '~contexts/RootDialogScreenContext'
import { ISensorData, ISensorDataFeedback, useRecommendationActionI18n } from '~shared/types/functions/data'
import { getTranslatedStatus } from '~translation/index'
import { TRecommendationActionKey } from '~translation/types'
import { useAddFeedback } from '../../apis'

interface IFeedbackDetailDialogProps {
  currentData: ISensorData
  defaultFeedbackValues: DeepPartial<ISensorDataFeedback>
  addFeedback: ReturnType<typeof useAddFeedback>
}

FeedbackDetailDialog.defaultProps = {
  defaultFeedbackValues: {},
}

const formManager = new KCFormManager<ISensorDataFeedback>()

export default function FeedbackDetailDialog(props: IFeedbackDetailDialogProps) {
  const { setIsDialogOpen } = React.useContext(RootDialogScreenContext)
  const { t } = useTranslation()
  const recommendationActionI18n = useRecommendationActionI18n()

  const currentStatuses = Object.entries(props.currentData?.Prediction?.GeneralStatus ?? {}).map(([key, value]) => getTranslatedStatus({ key, value }))
  const currentRecommendationActions = Object.entries(props.currentData?.Prediction?.RecommendationActions ?? {})
    .filter(([_, value]) => Number(value.toFixed(2)) !== 0)
    .map(([key, value]) => recommendationActionI18n.translate(key as TRecommendationActionKey, value))

  // const defaultValues: Omit<ISensorDataFeedback, 'Hash'> = lodash.merge(
  //   {
  //     ...props.currentData,
  //     Feedback: {
  //       Status: {
  //         IsGood: null,
  //         Suggestions: [],
  //         FeedbackDetail: '',
  //       },
  //       RecommendationActions: {
  //         IsGood: null,
  //         Suggestions: [],
  //         FeedbackDetail: '',
  //       },
  //     },
  //   },
  //   props.defaultFeedbackValues,
  // )

  const handleSubmitForm = React.useCallback((data: ISensorDataFeedback) => {
    props.addFeedback.sendRequest(data)
    setIsDialogOpen(false)
    toast.success('Sent feedback successfully!')
  }, [])

  const Footer = (
    <div className='flex flex-row-reverse p-4'>
      <KCButton type='submit'>Submit</KCButton>
    </div>
  )

  return <></>

  // return (
  //   <formManager.Form onSubmit={handleSubmitForm} defaultValues={defaultValues}>
  //     <KCDialogContentContainer containerClassName='w-screen' type='root-dialog' header='Feedback' footer={Footer}>
  //       <div className='p-4'>
  //         <div className='flex flex-col gap-1'>
  //           <div className='flex items-center justify-between'>
  //             <div className='flex items-center gap-2'>
  //               <span>Time: </span>
  //               <span className='font-semibold'>{getStringTimeOfSensorData(props.currentData)}</span>
  //             </div>
  //             {/* <Reliability reliability={props.currentData?.Prediction?.Reliability} /> */}
  //           </div>
  //           <div className='mt-4 flex items-center gap-2'>
  //             <span>Nồng độ Oxy khu vực 1 (%)</span>
  //             <span className='font-semibold'>{props.currentData?.SensorData.GA01_Oxi}</span>
  //           </div>
  //           <div className='flex items-center gap-2'>
  //             <span>Nồng độ Oxy khu vực 2 (%)</span>
  //             <span className='font-semibold'>{props.currentData?.SensorData.GA02_Oxi}</span>
  //           </div>
  //           <div className='flex items-center gap-2'>
  //             <span>Nồng độ Oxy khu vực 3 (%)</span>
  //             <span className='font-semibold'>{props.currentData?.SensorData.GA03_Oxi}</span>
  //           </div>
  //           <div className='flex items-center gap-2'>
  //             <span>Nồng độ Oxy khu vực 4 (%)</span>
  //             <span className='font-semibold'>{props.currentData?.SensorData.GA04_Oxi}</span>
  //           </div>
  //           <div className='flex items-center gap-2'>
  //             <span>Nhiệt độ khu vực đốt chính (°C): </span>
  //             <span className='font-semibold'>{props.currentData?.SensorData.Pyrometer}</span>
  //           </div>
  //           <div className='flex items-center gap-2'>
  //             <span>Nồng độ khí Nox (ppm): </span>
  //             <span className='font-semibold'>{props.currentData?.SensorData.Nox}</span>
  //           </div>
  //           <div className='flex items-center gap-2'>
  //             <span>Nhiệt độ đầu lò (°C): </span>
  //             <span className='font-semibold'>{props.currentData?.SensorData.KilnInletTemp}</span>
  //           </div>
  //         </div>
  //         <div className='mt-8 flex flex-col gap-8'>
  //           {/* Current status */}
  //           <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
  //             <div className='col-span-1 flex flex-col justify-start'>
  //               <div className='flex flex-col gap-2'>
  //                 <div className='flex items-center justify-between'>
  //                   <span className='font-semibold text-kc-highlight'>Status</span>
  //                   <formManager.LikeDislike name='Feedback.Status.IsGood' />
  //                 </div>
  //                 <div className='flex flex-col gap-1'>
  //                   {currentStatuses.map((currentStatus, idx) => (
  //                     <div key={idx}>
  //                       {idx + 1}. {currentStatus}
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //             </div>
  //             <div className='col-span-1 flex flex-col gap-2'>
  //               <div className='flex h-8 items-center font-semibold text-kc-highlight'>Feedback</div>
  //               <formManager.MultipleSelect
  //                 size='small'
  //                 name='Feedback.Status.Suggestions'
  //                 placeholder='Select your suggestions'
  //                 options={[
  //                   ...Object.values(vietnameseStatusKeys).reduce((prev, currentKey) => {
  //                     const newResult = [...prev]
  //                     for (const value of Object.values(vietnameseStatusValues)) {
  //                       const text = `${currentKey} ${value}`
  //                       newResult.push({ label: text, value: text })
  //                     }
  //                     return newResult
  //                   }, [] as IInputOption[]),
  //                 ]}
  //               />
  //               <formManager.TextAreaAutosize name='Feedback.Status.FeedbackDetail' minRows={3} placeholder='Feedback detail' className='mt-2' />
  //             </div>
  //           </div>

  //           {/* Recommendation actions */}
  //           <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
  //             <div className='col-span-1 flex flex-col justify-start'>
  //               <div className='flex flex-col gap-2'>
  //                 <div className='flex items-center justify-between'>
  //                   <span className='font-semibold text-kc-highlight'>Recommendation actions</span>
  //                   <formManager.LikeDislike name='Feedback.RecommendationActions.IsGood' />
  //                 </div>
  //                 <div className='flex flex-col gap-1'>
  //                   {currentRecommendationActions.map((recommendationActions, idx) => (
  //                     <div key={idx}>
  //                       {idx + 1}. {recommendationActions}
  //                     </div>
  //                   ))}
  //                 </div>
  //               </div>
  //             </div>
  //             <div className='col-span-1 flex flex-col gap-2'>
  //               <div className='flex h-8 items-center font-semibold text-kc-highlight'>Feedback</div>
  //               <formManager.MultipleSelect
  //                 size='small'
  //                 name='Feedback.RecommendationActions.Suggestions'
  //                 placeholder='Select your suggestions'
  //                 options={[
  //                   ...Object.values(vietnameseRecommendationActionKeys).reduce((prev, currentKey) => {
  //                     const newResult = [...prev]
  //                     for (const value of Object.values(vietnameseRecommendationActionValues)) {
  //                       const text = `${value} ${currentKey}`
  //                       newResult.push({ label: text, value: text })
  //                     }
  //                     return newResult
  //                   }, [] as IInputOption[]),
  //                 ]}
  //               />
  //               <formManager.TextAreaAutosize name='Feedback.RecommendationActions.FeedbackDetail' minRows={3} placeholder='Feedback detail' className='mt-2' />
  //             </div>
  //           </div>
  //         </div>
  //       </div>
  //     </KCDialogContentContainer>
  //   </formManager.Form>
  // )
}
