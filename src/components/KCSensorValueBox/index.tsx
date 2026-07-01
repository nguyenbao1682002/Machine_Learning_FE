import React from 'react'

interface SensorValueBoxProps {
  label: string
  value: string
  unit?: string
  position?: {
    bottom?: string
    left?: string
    width?: string
  }
  translate?: string
  textSize?: {
    base?: string
    sm?: string
    lg?: string
    xl?: string
    '2xl'?: string
    '3xl'?: string
  }
}

const SensorValueBox: React.FC<SensorValueBoxProps> = ({ label, value, unit, position = {}, translate = '', textSize = {} }) => {
  const { base = 'text-[6px]', sm = '', lg = '', xl = '', ['2xl']: twoxl = '', ['3xl']: threexl = '' } = textSize

  const { bottom = '', left = '', width = '' } = position

  return (
    <div
      className={`
        absolute rounded bg-black bg-opacity-50
        px-0.5 py-0 text-center leading-tight text-white sm:px-1 sm:py-1
        ${bottom} ${left} ${width} ${translate}
      `}
    >
      <h3 className={`font-bold ${base} ${sm} ${lg} ${xl} ${twoxl} ${threexl}`}>{label}</h3>
      <p className={`${base} ${sm} ${lg} ${xl} ${twoxl} ${threexl}`}>
        {value} {unit}
      </p>
    </div>
  )
}

export default SensorValueBox
