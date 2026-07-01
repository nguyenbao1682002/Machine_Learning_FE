import ESTECLogo from '~assets/images/logo.png'
import { SideBarItem } from './components'
import { sideBarStructure } from './configs'
import { useTranslation } from 'react-i18next'

interface ISideBarProps {}

export default function SideBar(props: ISideBarProps) {
  const { t } = useTranslation()
  return (
    <div className='h-full w-full overflow-y-auto overflow-x-hidden rounded-kc-primary bg-kc-card shadow-md'>
      <div className='flex flex-col items-center gap-2 px-2 py-10 lg:gap-8 lg:px-4 lg:py-8'>
        <div className='hidden items-center justify-center gap-4 lg:flex'>
          <img alt='estec-logo' src={ESTECLogo} className='h-14 w-full object-contain' />
        </div>
        {sideBarStructure.map((group, groupIdx) => (
          <div key={groupIdx} className='flex w-full flex-col lg:gap-2'>
            {group.groupName && <div className='hidden text-kc-sub-1 lg:block'>{t(group.groupName)}</div>}
            <div className='flex flex-col'>
              {group.items.map((item, itemIdx) => (
                <SideBarItem key={itemIdx} {...item} label={t(item.label)} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
