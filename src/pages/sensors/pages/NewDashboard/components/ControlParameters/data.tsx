import { ISensorData } from '~shared/types/functions/data'

type ControlParameter = {
  label: string
  key: keyof ISensorData['SensorData']
  range: {
    min: number
    max: number
  }

  unit: string
  alertText: string
}

export const ControlParametersData: ControlParameter[] = [
  {
    label: 'Pyrometer',
    key: 'Pyrometer',
    range: {
      min: 0,
      max: 3000,
    },

    unit: '°C',
    alertText: 'Cảnh báo, Pyrometer đang nằm ngoài ngưỡng an toàn!',
  },
  {
    label: 'BET',
    key: 'KilnInletTemp',
    range: {
      min: 0,
      max: 2500,
    },
    unit: '°C',
    alertText: 'Cảnh báo, Nhiệt độ đầu lò (BET) đang nằm ngoài ngưỡng an toàn!',
  },
  {
    label: 'Tải lò',
    key: 'KilnDriAmp',
    range: {
      min: 0,
      max: 500,
    },
    unit: 'A',
    alertText: 'Cảnh báo, Tải lò đang nằm ngoài ngưỡng an toàn!',
  },
  {
    label: 'Nồng độ Oxy đầu lò',
    key: 'GA01_Oxi',
    range: {
      min: 0,
      max: 50,
    },
    unit: '%',
    alertText: 'Cảnh báo, Nồng độ Oxy đang nằm ngoài ngưỡng an toàn!',
  },
  {
    label: 'Nồng độ Nox đầu lò',
    key: 'Nox',
    range: {
      min: 0,
      max: 1500,
    },
    unit: 'ppm',
    alertText: 'Cảnh báo, Nồng độ Nox đang nằm ngoài ngưỡng an toàn!',
  },
  {
    label: 'Vôi tự do',
    key: 'CaO_f',
    range: {
      min: 0,
      max: 15,
    },
    unit: '%',
    alertText: 'Cảnh báo, lượng vôi tự do đang nằm ngoài ngưỡng an toàn!',
  },
  {
    label: 'Hàm lượng SO3',
    key: 'S03_hot_meal',
    range: {
      min: 0,
      max: 15,
    },
    unit: '%',
    alertText: 'Cảnh báo, Hàm lượng SO3 đang nằm ngoài ngưỡng an toàn!',
  },
]
