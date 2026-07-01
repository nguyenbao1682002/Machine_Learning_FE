import classNames from 'classnames'
import { getSettingsGrid } from './configs'

export function SettingsPage() {
  return (
    <div className='p-6'>
      <div className='min-h-[12rem] rounded-lg bg-kc-card p-4'>
        <div className='grid grid-cols-12'>
          {getSettingsGrid().map((item, idx) => (
            <div
              key={idx}
              onClick={item.onClick}
              className={classNames(`col-span-6 min-h-[6rem] rounded-kc-primary ${idx != 3 ? 'hover:bg-kc-hover-highlight' : ''}  md:col-span-4 lg:col-span-3`)}
            >
              <div className='flex cursor-pointer gap-4 p-3'>
                <div>{item.icon}</div>
                <div className='flex flex-col'>
                  <div className='font-medium text-kc-highlight'>{item.mainLabel}</div>
                  <div className='line-clamp-2 text-sm text-kc-sub-1'>{item.subLabel}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
