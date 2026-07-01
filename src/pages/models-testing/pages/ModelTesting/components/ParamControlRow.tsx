import React from 'react'
import { ParamConfig, ParamKey } from '../../../types'
import CustomSlider from './custom-slider/CustomSlider'

interface ParamControlRowProps {
  paramKey: ParamKey
  config: ParamConfig
  value: number
  onChange: (newValue: number) => void
  onConfigClick: (key: ParamKey) => void // Thêm prop để mở popup
}

const ParamControlRow: React.FC<ParamControlRowProps> = ({ paramKey, config, value, onChange, onConfigClick }) => {
  // LƯU Ý: Cập nhật isCritical để dùng boundaryLow/High từ config
  const isCritical = config.isCritical(value, config.boundaryLow, config.boundaryHigh)

  return (
    <div className='paramRow'>
      {/* 1. Label */}
      <div className='paramLabel'>{config.label}</div>
      {/* 2. Value Display */}
      <div className={`valueDisplay ${isCritical ? 'critical' : ''}`}>{value.toFixed(config.step === 1 ? 0 : 1)}</div>
      {/* 3. Slider Control */}
      <div style={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
        <div style={{ flexGrow: 1 }}>
          <CustomSlider config={config} value={value} onChange={onChange} />
        </div>
        {/* Nút Config */}
        <button className='configButton' onClick={() => onConfigClick(paramKey)}>
          ⚙️
        </button>
      </div>
    </div>
  )
}

export default ParamControlRow
