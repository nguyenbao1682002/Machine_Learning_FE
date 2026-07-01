import React from 'react'
import * as ReactSpinner from 'react-spinners'
import ThemeContext from '~contexts/ThemeContext'
import { KCRoundedSpinner } from './components'
import { TLoadingStyle } from './types'

interface IKCLoadingProps {
  loadingStyle: TLoadingStyle
  size: number
}

KCLoading.defaultProps = {
  size: 16,
}

export function KCLoading(props: IKCLoadingProps) {
  const { themeData } = React.useContext(ThemeContext)

  const commonReactSpinnerProps = {
    size: props.size,
    cssOverride: {},
    color: themeData['kc-highlight'],
  }

  switch (props.loadingStyle) {
    case 'rounded-spinner': {
      return <KCRoundedSpinner expandToFullParent size={props.size} />
    }
    case 'bar-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.BarLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'beat-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.BeatLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'bounce-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.BounceLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'circle-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.CircleLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'climbing-box-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.ClimbingBoxLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'clip-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.ClipLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'clock-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.ClockLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'dot-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.DotLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'fade-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.FadeLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'grid-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.GridLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'hash-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.HashLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'moon-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.MoonLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'pacman-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.PacmanLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'propagate-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.PropagateLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'puff-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.PuffLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'pulse-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.PulseLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'ring-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.RingLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'rise-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.RiseLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'rotate-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.RotateLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'scale-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.ScaleLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'skew-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.SkewLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'square-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.SquareLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    case 'sync-loader': {
      return (
        <div className='flex justify-center'>
          <ReactSpinner.SyncLoader {...commonReactSpinnerProps} />
        </div>
      )
    }
    default: {
      return <></>
    }
  }
}
