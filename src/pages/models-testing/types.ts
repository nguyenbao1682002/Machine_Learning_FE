export interface ParamConfig {
  label: string
  min: number // Phạm vi min của thanh trượt
  max: number // Phạm vi max của thanh trượt
  step: number
  initialValue: number
  boundaryLow: number // Ngưỡng dưới an toàn
  boundaryHigh: number // Ngưỡng trên an toàn
  isCritical: (value: number, low: number, high: number) => boolean
}

export type ParamKey =
  | 'Pyrometer'
  | 'KilnInletTemp'
  | 'KilnDriAmp'
  | 'GA01_Oxi'
  | 'GA02_Oxi'
  | 'GA03_Oxi'
  | 'CO'
  | 'NOx'

export const PARAM_CONFIGS: Record<ParamKey, ParamConfig> = {
  Pyrometer: {
    label: "Pyrometer (°C)",
    min: 1000,
    max: 2000,
    step: 0.1,
    initialValue: 1390,
    boundaryLow: 1300,
    boundaryHigh: 1500,
    isCritical: (v, low, high) => v < low || v > high,
  },
  KilnInletTemp: {
    label: "Nhiệt đầu lò (°C)",
    min: 800,
    max: 1200,
    step: 0.1,
    initialValue: 1000,
    boundaryLow: 950,
    boundaryHigh: 1100,
    isCritical: (v, low, high) => v < low || v > high,
  },
  KilnDriAmp: {
    label: 'Tải lò (A)',
    min: 0,
    max: 500,
    step: 0.1,
    initialValue: 300,
    boundaryLow: 230,
    boundaryHigh: 380,
    isCritical: (v, low, high) => v < low || v > high,
  },
  GA01_Oxi: {
    label: "O₂ đầu lò (%)",
    min: 0,
    max: 25.0,
    step: 0.1,
    initialValue: 5,
    boundaryLow: 3.8,
    boundaryHigh: 8.0,
    isCritical: (v, low, high) => v < low || v > high,
  },
  GA02_Oxi: {
    label: 'O₂ sau tháp 2 (%)',
    min: 0,
    max: 25.0,
    step: 0.1,
    initialValue: 3,
    boundaryLow: 2.0,
    boundaryHigh: 20.0,
    isCritical: (v, low, high) => v < low || v > high,
  },
  GA03_Oxi: {
    label: 'O₂ sau tháp 3 (%)',
    min: 0,
    max: 25.0,
    step: 0.1,
    initialValue: 3,
    boundaryLow: 2.0,
    boundaryHigh: 20.0,
    isCritical: (v, low, high) => v < low || v > high,
  },
  CO: {
    label: 'CO khí thải (ppm)',
    min: 0,
    max: 1000,
    step: 1,
    initialValue: 300,
    boundaryLow: 0,
    boundaryHigh: 400,
    isCritical: (v, low, high) => v < low || v > high,
  },
  NOx: {
    label: 'NOx khí thải (mg/Nm³)',
    min: 500,
    max: 1500,
    step: 1,
    initialValue: 1000,
    boundaryLow: 500,
    boundaryHigh: 1200,
    isCritical: (v, low, high) => v < low || v > high,
  },
}

export interface ShapeleyItem {
  feature: string
  value: number
  contribution: number
}

export interface PredictionData {
  status: string // Trạng thái: "Không ổn định"
  shapValues: ShapeleyItem[]
  aiAgentProposal: {
    suggestion: string[]
    explanation: string
  }
}

// Dữ liệu mẫu MOCK (Giả định sau khi nhấn "Dự đoán")
export const MOCK_PREDICTION_DATA: PredictionData = {
  status: 'Không ổn định',
  shapValues: [
    { feature: 'Pyrometer', value:1390,  contribution: 0.3 },
    { feature: 'BET', value :1000, contribution: -3.5 },
    { feature: 'Tải lò', value :1000, contribution: -0.2 },
    { feature: 'O2 đầu lò', value :1000, contribution: -0.5 },
    { feature: 'Nox đầu lò', value :1000, contribution: 1.2 },
    { feature: 'O2 sau tháp 2', value :1000, contribution: -0.1},
    { feature: 'O2 sau tháp 3', value :1000, contribution: -1.2 },
  ].sort((a, b) => Math.abs(b.contribution) - Math.abs(a.contribution)), // Sắp xếp theo độ lớn
  aiAgentProposal: {
    suggestion: ['FanSP: -0.2 %', 'CoalSP: -0.2 t/h', 'FurnaceSpeedSP: 0.1'],
    explanation:
      'Giảm nhiệt độ BZT (Pyrometer +1.88, 1580°C) và BET (KilninletTemp +1.28, 1325°C) bằng 3F: giảm than nhẹ (-0.2 t/h), tăng gió hỗ trợ (0.2 %-point), tăng tốc lò để phân tán nhiệt (0.1 rpm). Chờ 10 phút để quan sát ổn định nhiệt độ theo quy trình vận hành.',
  },
}
