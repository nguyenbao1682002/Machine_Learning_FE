import * as MdIcons from 'react-icons/md'
import { ISideBarItem } from '../types'

export const sideBarItems: ISideBarItem[] = [
  {
    icon: <MdIcons.MdOutlineHome size={26} fontWeight={400} />,
    label: 'Home',
    path: '/',
    highlightStyle: 'highlight-with-card-style',
  },
  {
    icon: <MdIcons.MdInsertChartOutlined size={26} fontWeight={400} />,
    label: 'Factory sensors',
    highlightStyle: 'highlight-only-label',
    children: [
      {
        label: '1. New dashboard',
        translationLabel: (t) => `1. ${t('Dashboard')}`,
        path: '/factory-sensors/new-realtime-dashboard',
        highlightStyle: 'highlight-with-card-style',
      },
      {
        label: '2. Playback',
        translationLabel: (t) => `2. ${t('Playback')}`,
        path: '/factory-sensors/playback-dashboard',
        highlightStyle: 'highlight-with-card-style',
      },
    ],
  },
  {
    icon: <MdIcons.MdModelTraining size={26} fontWeight={400} />,
    label: 'ModelTesting',
    highlightStyle: 'highlight-only-label',
    children: [
      {
        label: '1. Model Testing',
        translationLabel: (t) => `1. ${t('Testing')}`,
        path: '/model-testing',
        highlightStyle: 'highlight-with-card-style',
      },
      {
        label: '2. Model Testing Diary',
        translationLabel: (t) => `2. ${t('Diary')}`,
        path: '/model-testing-diary',
        highlightStyle: 'highlight-with-card-style',
      }
    ],
  },
  {
    icon: <MdIcons.MdOutlineSettings size={26} fontWeight={400} />,
    label: 'Settings',
    path: '/settings',
    highlightStyle: 'highlight-with-card-style',
  },
]
