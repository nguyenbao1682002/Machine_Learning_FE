import React, { useCallback } from 'react'
import { ParamConfig } from '../../../../types'
import "./CustomSlider.css"

interface CustomSliderProps {
  config: ParamConfig
  value: number
  onChange: (newValue: number) => void
}

const CustomSlider: React.FC<CustomSliderProps> = ({ config, value, onChange }) => {
  const { min, max, step, boundaryLow, boundaryHigh } = config

  // Tính toán các vị trí hiển thị
  const percent = ((value - min) / (max - min)) * 100
  const lowPercent = ((boundaryLow - min) / (max - min)) * 100
  const highPercent = ((boundaryHigh - min) / (max - min)) * 100

  // LƯU Ý: Thay đổi isCritical để dùng ngưỡng mới từ config
  const isCritical = config.isCritical(value, boundaryLow, boundaryHigh)
  const handleSliderChange = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
      onChange(Number(event.target.value))
    },
    [onChange],
  )

  // Thuộc tính CSS cho track (phần đã trượt)
  const trackStyle: React.CSSProperties = {
    width: `${percent}%`,
    backgroundColor: isCritical ? '#f44336' : '#3f51b5',
  }

  // Vị trí cho nhãn giá trị nổi
  const labelStyle: React.CSSProperties = {
    left: `calc(${percent}% + 4px)`,
  }

  return (
    <div className='sliderContainer'>
      <div className='sliderRail'>
        {/* 1. HIỂN THỊ VÙNG NGƯỠNG AN TOÀN */}
        <div
          className='safetyRange'
          style={{
            left: `${lowPercent}%`,
            width: `${highPercent - lowPercent}%`,
          }}
        />

        {/* 2. HIỂN THỊ MARKERS NGƯỠNG */}
       <div className='boundaryMarker low' style={{ left: `${lowPercent}%` }}>
          <span className='markerTriangle' />
          <span className='markerLabel'>{boundaryLow}</span>
        </div>
        <div className='boundaryMarker high' style={{ left: `${highPercent}%` }}>
          <span className='markerTriangle' />
          <span className='markerLabel'>{boundaryHigh}</span>
        </div>

        {/* Thanh Trượt (Track) */}
        <div className={`sliderTrack ${isCritical ? 'critical' : ''}`} style={trackStyle} />
        
        {/* Nhãn Giá trị Nổi */}
        <div className='valueLabel' style={labelStyle}>
          {value.toFixed(config.step === 1 ? 0 : 1)}
        </div>
        
        {/* Input Range thực tế */}
        <input type='range' min={min} max={max} step={step} value={value} onChange={handleSliderChange} className={`sliderInput ${isCritical ? 'critical' : ''}`} />
        
        {/* Nhãn Min/Max */}
        <div className='sliderMarks'>
          <span>{min}</span>
          <span>{max}</span>
        </div>
      </div>
    </div>
  )
}

export default CustomSlider
