import * as MdIcons from 'react-icons/md'
import * as TbIcons from 'react-icons/tb'
import { SettingsPage } from '~pages/system'
import { SideBarItem } from '../components'

interface IGroup {
  groupName?: string
  items: React.ComponentProps<typeof SideBarItem>[]
}

export const sideBarStructure: IGroup[] = [
  {
    groupName: 'General',
    items: [{ icon: <TbIcons.TbHome size={22} fontWeight={400} />, label: 'Home', path: '/' }],
  },
  {
    groupName: 'Factory sensors',
    items: [
      {
        icon: <MdIcons.MdAutoGraph size={24} fontWeight={400} />,
        label: 'Realtime data',
        path: '/factory-sensors/realtime-dashboard',
      },
      {
        icon: <MdIcons.MdHistory size={22} fontWeight={400} />,
        label: 'Playback',
        path: '/factory-sensors/playback-dashboard',
      },
    ],
  },
  {
    groupName: 'System',
    items: [{ icon: <MdIcons.MdSettingsSuggest size={24} fontWeight={400} />, label: 'Settings', openRootDialogScreen: <SettingsPage /> }],
  },
]
