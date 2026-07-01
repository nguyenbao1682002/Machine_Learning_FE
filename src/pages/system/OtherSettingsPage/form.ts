import { Path } from 'react-hook-form'
import { IUpdateThreshold } from '~shared/types/functions/data'

type FormItem = {
  label: string
  key: Path<IUpdateThreshold>
}

type Group = {
  groupName: string
  items: FormItem[]
}

export const FormGroups: Group[] = [
  {
    groupName: 'Pyrometer',
    items: [
      { key: 'Pyrometer.min', label: 'Ngưỡng tối thiểu' },
      { key: 'Pyrometer.max', label: 'Ngưỡng tối đa' },
    ],
  },
  {
    groupName: 'BET',
    items: [
      { key: 'KilnInletTemp.min', label: 'Ngưỡng tối thiểu' },
      { key: 'KilnInletTemp.max', label: 'Ngưỡng tối đa' },
    ],
  },
  {
    groupName: 'Tải lò',
    items: [
      { key: 'KilnDriAmp.min', label: 'Ngưỡng tối thiểu' },
      { key: 'KilnDriAmp.max', label: 'Ngưỡng tối đa' },
    ],
  },
  {
    groupName: 'GA01',
    items: [
      { key: 'GA01_Oxi.min', label: 'Ngưỡng tối thiểu' },
      { key: 'GA01_Oxi.max', label: 'Ngưỡng tối đa' },
    ],
  },
  {
    groupName: 'Nồng độ Nox',
    items: [
      { key: 'Nox.min', label: 'Ngưỡng tối thiểu' },
      { key: 'Nox.max', label: 'Ngưỡng tối đa' },
    ],
  },
  {
    groupName: 'Vôi tự do',
    items: [
      { key: 'CaO_f.min', label: 'Ngưỡng tối thiểu' },
      { key: 'CaO_f.max', label: 'Ngưỡng tối đa' },
    ],
  },
  {
    groupName: 'Hàm lượng S03',
    items: [
      { key: 'S03_hot_meal.min', label: 'Ngưỡng tối thiểu' },
      { key: 'S03_hot_meal.max', label: 'Ngưỡng tối đa' },
    ],
  },
]
