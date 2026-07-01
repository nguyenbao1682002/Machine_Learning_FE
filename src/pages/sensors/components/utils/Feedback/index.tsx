import { DeepPartial } from 'react-hook-form'
import * as RiIcons from 'react-icons/ri'
import { KCRootDialogScreenLink } from '~components'
import { ISensorData, ISensorDataFeedback } from '~shared/types/functions/data'
import { useAddFeedback } from './apis'
import FeedbackDetailDialog from './components/FeedbackDetailDialog'

interface IFeedbackProps {
  currentData: ISensorData
  likeDefaultFeedbackValues: DeepPartial<ISensorDataFeedback>
  dislikeDefaultFeedbackValues: DeepPartial<ISensorDataFeedback>
}

Feedback.defaultProps = {
  likeDefaultFeedbackValues: {},
  dislikeDefaultFeedbackValues: {},
}

export default function Feedback(props: IFeedbackProps) {
  const addFeedback = useAddFeedback()

  return (
    <div className='flex items-center'>
      <KCRootDialogScreenLink
        renderComponent={<FeedbackDetailDialog currentData={props.currentData} addFeedback={addFeedback} defaultFeedbackValues={props.likeDefaultFeedbackValues} />}
      >
        <div className='flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full hover:bg-kc-alpha-10'>
          <RiIcons.RiThumbUpLine />
        </div>
      </KCRootDialogScreenLink>

      <KCRootDialogScreenLink
        renderComponent={<FeedbackDetailDialog currentData={props.currentData} addFeedback={addFeedback} defaultFeedbackValues={props.dislikeDefaultFeedbackValues} />}
      >
        <div className='flex h-8 w-8 cursor-pointer items-center justify-center overflow-hidden rounded-full hover:bg-kc-alpha-10'>
          <RiIcons.RiThumbDownLine />
        </div>
      </KCRootDialogScreenLink>
    </div>
  )
}
