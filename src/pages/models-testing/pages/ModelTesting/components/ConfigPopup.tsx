/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react'
import { ParamConfig, ParamKey } from '../../../types'

interface BoundaryState {
  low: number
  high: number
}

interface ConfigPopupProps {
  config: ParamConfig
  paramKey: ParamKey
  onClose: () => void
  onSave: (key: ParamKey, newLow: number, newHigh: number) => void
}

const ConfigPopup: React.FC<ConfigPopupProps> = ({ config, paramKey, onClose, onSave }) => {
  
  // Sử dụng boundaryLow/High hiện tại làm state ban đầu
  const [lowBoundary, setLowBoundary] = useState<number>(config.boundaryLow);
  const [highBoundary, setHighBoundary] = useState<number>(config.boundaryHigh);

  // const handleSave = () => {
  //   // Kiểm tra logic đơn giản: Low không được lớn hơn High
  //   // if (boundaries.low >= boundaries.high) {
  //   //   alert('Ngưỡng Thấp phải nhỏ hơn Ngưỡng Cao')
  //   //   return
  //   // }
  //   // onSave(paramKey, boundaries.low, boundaries.high)
  //   onClose()
  // }

  console.log(lowBoundary);

  const handleSave = () => {
    if (lowBoundary >= highBoundary) {
      alert('⚠️ Ngưỡng thấp phải nhỏ hơn ngưỡng cao!')
      return
    }

    // Gửi dữ liệu mới về parent
    onSave(paramKey, lowBoundary, highBoundary)
    onClose()
  }

  return (
    <div className='popupOverlay'>
      <div className='popupContent'>
        <h3>Cấu hình ngưỡng cho {config.label}</h3>
        <div className='configRow'>
          <label>Ngưỡng Thấp:</label>
          <input
            type='number'
            step={config.step}
            min={config.min}
            max={config.max}
            value={lowBoundary}
            onChange={(e) => setLowBoundary(Number(e.target.value))}
          />
        </div>
        <div className='configRow'>
          <label>Ngưỡng Cao:</label>
          <input
            type='number'
            step={config.step}
            min={config.min}
            max={config.max}
            value={highBoundary}
            onChange={(e) => setHighBoundary(Number(e.target.value))}
          />
        </div>
        <div className='configActions'>
          <button className='cancelButton' onClick={onClose}>
            Hủy
          </button>
          <button className='saveButton' onClick={handleSave}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfigPopup
