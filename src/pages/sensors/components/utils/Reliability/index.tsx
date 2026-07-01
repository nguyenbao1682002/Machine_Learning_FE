import classNames from 'classnames'

interface IReliabilityProps {
  reliability?: number
}

Reliability.defaultProps = {}

export default function Reliability(props: IReliabilityProps) {
  if (props.reliability) {
    const reliability = Number((props.reliability * 100).toFixed(2))
    return (
      <div className='flex items-center justify-end gap-1'>
        <span>Reliability: </span>
        <span
          className={classNames({
            'text-green-600': reliability > 90,
            'text-yellow-500': 90 > reliability && reliability > 75,
            'text-red-500': 75 > reliability,
          })}
        >
          {reliability}%
        </span>
      </div>
    )
  } else {
    return null
  }
}
