import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import classNames from 'classnames'
import { ReactComponent as SVG_RoundedLoading } from '~assets/rounded-loading.svg'

const infinityRotating = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const RoundedLoadingSVG = styled(SVG_RoundedLoading)<{ size: number }>`
  position: relative;
  max-width: ${(props) => props.size}px;
  max-height: ${(props) => props.size}px;
  animation-name: ${infinityRotating};
  animation-duration: 0.5s;
  animation-iteration-count: infinite;
  animation-timing-function: linear;
  & circle.loading_background {
    stroke: ${() => 'var(--kc-highlight)'};
    opacity: 0.2;
  }
  & circle.loading_indicator_part {
    stroke: ${() => 'var(--kc-highlight)'};
    stroke-dasharray: 80;
    stroke-dashoffset: 60;
  }
`

const SFixedCenterOfParent = styled(RoundedLoadingSVG)<{ size: number }>`
  position: absolute;
  left: calc(50% - ${(props) => props.size / 2}px);
  top: calc(50% - ${(props) => props.size / 2}px);
  transform: translate(-50%, -50%);
`

interface IKCRoundedSpinnerProps {
  expandToFullParent: boolean
  fixedCenterOfParent: boolean
  containerClassName: string
  size: number
}

KCRoundedSpinner.defaultProps = {
  expandToFullParent: false,
  fixedCenterOfParent: false,
  containerClassName: '',
  size: 24,
}

export function KCRoundedSpinner(props: IKCRoundedSpinnerProps) {
  if (props.fixedCenterOfParent) {
    return <SFixedCenterOfParent className={classNames(props.containerClassName)} size={props.size} />
  } else if (props.expandToFullParent) {
    return (
      <div className={classNames('flex-column flex h-full w-full items-center justify-center overflow-hidden', props.containerClassName)}>
        <RoundedLoadingSVG size={props.size} />
      </div>
    )
  } else {
    return (
      <div className={classNames(`overflow-hidden`, props.containerClassName)}>
        <RoundedLoadingSVG size={props.size} />
      </div>
    )
  }
}
