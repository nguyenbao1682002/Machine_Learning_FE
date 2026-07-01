import * as IoIcons from 'react-icons/io5'
import { useNavigate } from 'react-router-dom'
import { KCIconButton } from '~components'

interface IKCBackButtonStringUrlProps {
  goBackUrl?: string
}

interface IKCBackButtonFunctionUrlProps {
  goBackUrl?: () => string
}

export default function KCBackButton(props: IKCBackButtonStringUrlProps | IKCBackButtonFunctionUrlProps) {
  const navigate = useNavigate()
  const handleGoBack = () => {
    if (props.goBackUrl) {
      if (typeof props.goBackUrl === 'string') {
        navigate(props.goBackUrl, { replace: true })
      } else if (typeof props.goBackUrl === 'function') {
        navigate(props.goBackUrl(), { replace: true })
      }
    } else {
      navigate(-1)
    }
  }
  return (
    <KCIconButton size={9} rounded='full' onClick={handleGoBack}>
      <IoIcons.IoChevronBackSharp size={20} className='pr-[0.125rem]' />
    </KCIconButton>
  )
}
