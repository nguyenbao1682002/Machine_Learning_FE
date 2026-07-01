import { ISensorData } from '~shared/types/functions/data'
import { ControlParametersData } from '../ControlParameters/data'
import Callout from '~assets/images/callout.png'
import Callout1 from '~assets/images/callout1.png'
import { TiInfoLarge } from 'react-icons/ti'

interface ControlParametersProps {
  currentSensorData: ISensorData | undefined
  sensorDataArr: ISensorData[]
}

export const Stats = (props: ControlParametersProps) => {
  const arrStats: number[] = []
  const isSidebarOpen = localStorage.getItem('isSideBarOpen')

  ControlParametersData.map((e, idx) => {
    let value = Number(props.currentSensorData?.SensorData[e.key]?.toFixed(2))
    if (value === 0) {
      for (let i = props.sensorDataArr.length - 1; i >= props.sensorDataArr.length - 6; i--) {
        if (props.sensorDataArr[i].SensorData[e.key] !== 0) {
          value = Number(props.sensorDataArr[i].SensorData[e.key]?.toFixed(2))
          break
        } else continue
      }
    }
    arrStats.push(value)
  })

  return (
    <>
      <div
        className={
          isSidebarOpen === 'false'
            ? 'group absolute bottom-[27%] right-[39%] h-4 w-4 cursor-pointer rounded-[100%] bg-yellow-200 font-semibold'
            : 'group absolute bottom-[30%] right-[38%] h-4 w-4 cursor-pointer rounded-[100%] bg-yellow-200 font-semibold'
        }
      >
        <TiInfoLarge className='absolute' />
        <div className='invisible relative left-3 top-[-68px] h-[56px] w-[60px] group-hover:visible'>
          <img alt='estec-logo' src={Callout} className='absolute h-[150%] w-[200%] object-contain' />
          <div className='absolute left-[40%] top-[35%] mt-2'>{arrStats[0]}&nbsp;°C</div>
        </div>
      </div>

      <div
        className={
          isSidebarOpen === 'false'
            ? 'group absolute bottom-[29%] left-[15%] h-4 w-4 cursor-pointer rounded-[100%] bg-yellow-200 font-semibold'
            : 'group absolute bottom-[32%] left-[14%] h-4 w-4 cursor-pointer rounded-[100%] bg-yellow-200 font-semibold'
        }
      >
        <TiInfoLarge className='absolute' />
        <div className='invisible relative right-28 top-[-70px] h-[56px] w-[60px] group-hover:visible'>
          <img alt='estec-logo' src={Callout1} className='rotate-360 absolute h-[150%] w-[200%] object-contain' />
          <div className='absolute left-[40%] top-[35%] mt-2'>{arrStats[1]}&nbsp;°C</div>
        </div>
      </div>

      <div
        className={
          isSidebarOpen === 'false'
            ? 'group absolute bottom-[20%] left-[30%] h-4 w-4 cursor-pointer rounded-[100%] bg-yellow-200 font-semibold'
            : 'group absolute bottom-[25%] left-[30%] h-4 w-4 cursor-pointer rounded-[100%] bg-yellow-200 font-semibold'
        }
      >
        <TiInfoLarge className='absolute' />
        <div className='invisible relative left-[4px] top-[2px] h-[56px] w-[60px] group-hover:visible'>
          <img alt='estec-logo' src={Callout1} className='absolute h-[150%] w-[200%] rotate-180 object-contain' />
          <div className='absolute left-[53%] top-[45%] mt-2'>{arrStats[2]}&nbsp;A</div>
        </div>
      </div>

      <div
        className={
          isSidebarOpen === 'false'
            ? 'group absolute bottom-[25%] left-[18%] h-4 w-4 cursor-pointer rounded-[100%] bg-yellow-200 font-semibold'
            : 'group absolute bottom-[29%] left-[18%] h-4 w-4 cursor-pointer rounded-[100%] bg-yellow-200 font-semibold'
        }
      >
        <TiInfoLarge className='absolute' />
        <div className='invisible relative bottom-2 right-[118px] h-[56px] w-[60px] group-hover:visible'>
          <img alt='estec-logo' src={Callout} className='absolute h-[150%] w-[200%] rotate-180 object-contain' />
          <div className='absolute left-[61%] top-[45%] mt-2'>{arrStats[3]}&nbsp;%</div>
        </div>
      </div>
    </>
  )
}
