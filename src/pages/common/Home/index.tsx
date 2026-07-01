import React, { useState, useEffect } from 'react'
import dayjs from 'dayjs'
// import { useTranslation } from 'react-i18next'
import i18next from 'i18next'
import AuthContext from '~contexts/AuthContext'
import { useGetDataForDashboard } from '../../sensors/pages/NewDashboard/apis/useGetDataForDashboard'
import welcomeBanner from '../../../assets/images/welcome-banner.jpg'
import { ISensorData, ISensorDataStreamData, SensorDataIssue } from '~shared/types/functions/data'
import { toast } from 'react-toastify'
import useWebSocket from 'react-use-websocket'
import { WEB_SOCKET_URL } from '~shared/constants'
import { useCurrentTime } from '~core/hooks'
import SensorValueBox from '../../../components/KCSensorValueBox' // nếu dùng CRA hoặc theo relative path
import { time } from 'echarts'

export function HomePage() {
  const { logout, loginData } = React.useContext(AuthContext)
  const { t } = i18next
  const [sensorDataArr, setSensorDataArr] = React.useState<ISensorData[]>([])
  // const { currentTime } = useCurrentTime()
  const [sensorDataIssues, setSensorDataIssues] = React.useState<SensorDataIssue[]>([])

  const [currentTime, setCurrentTime] = useState(dayjs())

  const { lastMessage } = useWebSocket(WEB_SOCKET_URL, {
    queryParams: {
      authorization: loginData.token ?? '',
    },

    shouldReconnect: (closeEvent) => {
      if (closeEvent.code === 1006) {
        logout()
        toast.warn('Your session is expired now. Please login again!')
        return false
      }
      return true
    },
    reconnectAttempts: 10,
    //attemptNumber will be 0 the first time it attempts to reconnect, so this equation results in a reconnect pattern of 1 second, 2 seconds, 4 seconds, 8 seconds, and then caps at 10 seconds until the maximum number of attempts is reached
    reconnectInterval: (attemptNumber) => Math.min(attemptNumber * 2 * 1000, 10000),
  })
  // State để lưu dữ liệu từ API
  // const [pyrometer, setPyrometer] = useState<string | null>('N/A')
  // const [bet, setBet] = useState<string | null>('N/A')
  // const [oxy, setOxy] = useState<string | null>('N/A')
  // const [load, setLoad] = useState<string | null>('N/A')
  // // const [dopolFanGasPressure, setDopolFanGasPressure] = useState<string | null>('N/A')
  // const [actualFuel, setActualFuel] = useState<string | null>('N/A')
  // const [actualFuelSP, setActualFuelSP] = useState<string | null>('N/A')
  // const [actualFeedRatePC, setActualFeedRatePC] = useState<string | null>('N/A')
  // const [actualFeedRateSZ, setActualFeedRateSZ] = useState<string | null>('N/A')
  // const [alternativeCoalSP, setAlternativeCoalSP] = useState<string | null>('N/A')
  // const [avgBZT, setAvgBZT] = useState<string | null>('N/A')
  // const [caOf, setCaOf] = useState<string | null>('N/A')
  // const [coalSP, setCoalSP] = useState<string | null>('N/A')
  // // const [coalBlowerPressure01, setCoalBlowerPressure01] = useState<string | null>('N/A')
  // // const [coalBlowerPressure02, setCoalBlowerPressure02] = useState<string | null>('N/A')
  // // const [conveyorFlow, setConveyorFlow] = useState<string | null>('N/A')
  // const [conveyorFlowRate01, setConveyorFlowRate01] = useState<string | null>('N/A')
  // const [conveyorFlowRate02, setConveyorFlowRate02] = useState<string | null>('N/A')
  // // const [fabricScale, setFabricScale] = useState<string | null>('N/A')
  // const [fanSP, setFanSP] = useState<string | null>('N/A')
  // // const [fan4E1ValveOpenCloseDegree, setFan4E1ValveOpenCloseDegree] = useState<string | null>('N/A')
  // // const [fan4S1, setFan4S1] = useState<string | null>('N/A')
  // const [furnaceSpeed, setFurnaceSpeed] = useState<string | null>('N/A')
  // const [furnaceSpeedSP, setFurnaceSpeedSP] = useState<string | null>('N/A')
  // const [ga01Oxi, setGa01Oxi] = useState<string | null>('N/A')
  // const [ga02Oxi, setGa02Oxi] = useState<string | null>('N/A')
  // const [ga03Oxi, setGa03Oxi] = useState<string | null>('N/A')
  // const [heatReplaceRatio, setHeatReplaceRatio] = useState<string | null>('N/A')
  // // const [hydraulicPressure, setHydraulicPressure] = useState<string | null>('N/A')
  // const [kilnDriAmp, setKilnDriAmp] = useState<string | null>('N/A')
  // const [kilnInletTemp, setKilnInletTemp] = useState<string | null>('N/A')
  // const [kilnhoodPressure, setKilnhoodPressure] = useState<string | null>('N/A')
  // const [materialTowerHeat, setMaterialTowerHeat] = useState<string | null>('N/A')
  // const [nox, setNox] = useState<string | null>('N/A')
  // const [recHeadTemp, setRecHeadTemp] = useState<string | null>('N/A')
  // const [s03HotMeal, setS03HotMeal] = useState<string | null>('N/A')
  // const [temperatureC2, setTemperatureC2] = useState<string | null>('N/A')
  // // const [temperatureC3, setTemperatureC3] = useState<string | null>('N/A')
  // // const [thermalExhaust, setThermalExhaust] = useState<string | null>('N/A')
  // const [totalHeatConsumption, setTotalHeatConsumption] = useState<string | null>('N/A')
  // const [towerOilTemp, setTowerOilTemp] = useState<string | null>('N/A')
  // // const [valveOpenDegree, setValveOpenDegree] = useState<string | null>('N/A')

  const [data, setData] = useState<Record<string, string | null>>({
    pyrometer: 'N/A',
    bet: 'N/A',
    oxy: 'N/A',
    load: 'N/A',
    actualFuel: 'N/A',
    actualFuelSP: 'N/A',
    actualFeedRatePC: 'N/A',
    actualFeedRateSZ: 'N/A',
    alternativeCoalSP: 'N/A',
    avgBZT: 'N/A',
    caOf: 'N/A',
    coalSP: 'N/A',
    conveyorFlowRate01: 'N/A',
    conveyorFlowRate02: 'N/A',
    fanSP: 'N/A',
    furnaceSpeed: 'N/A',
    furnaceSpeedSP: 'N/A',
    ga01Oxi: 'N/A',
    ga02Oxi: 'N/A',
    ga03Oxi: 'N/A',
    heatReplaceRatio: 'N/A',
    kilnDriAmp: 'N/A',
    kilnInletTemp: 'N/A',
    kilnhoodPressure: 'N/A',
    materialTowerHeat: 'N/A',
    nox: 'N/A',
    recHeadTemp: 'N/A',
    s03HotMeal: 'N/A',
    temperatureC2: 'N/A',
    totalHeatConsumption: 'N/A',
    towerOilTemp: 'N/A',
  })

  // Hook để gọi API
  const getDataForDashboard = useGetDataForDashboard()

  // React.useEffect(() => {
  //   if (lastMessage) {
  //     const streamData: ISensorDataStreamData = JSON.parse(lastMessage.data)
  //     switch (streamData.type) {
  //       case 'SENSOR_DATA__LAST_ITEMS': {
  //         addDataToSensorDataArr(streamData.data)
  //         break
  //       }
  //       default: {
  //         return
  //       }
  //     }
  //   }
  // }, [lastMessage, currentTime.format('mm')])

  // Use useEffect to update the time per second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(dayjs())
    }, 1000)
    // Clear timer when component unmount
    return () => clearInterval(timer)
  }, [])

  const updateSensorDataIssues = React.useCallback((newIssues: SensorDataIssue[]) => {
    setSensorDataIssues((prevIssues) => {
      let newIssuesArr = [...prevIssues]
      for (const issue of newIssues) {
        if (newIssuesArr.findIndex((i) => i.ID === issue.ID) === -1) {
          newIssuesArr.push(issue)
        } else {
          // Delete old one and push new one
          newIssuesArr = newIssuesArr.filter((i) => i.ID !== issue.ID)
          newIssuesArr.push(issue)
        }
      }

      // Sort by time
      newIssuesArr.sort((a, b) => (dayjs(a.Date).isBefore(dayjs(b.Date)) ? -1 : 1))

      return newIssuesArr.slice(-10)
    })
  }, [])

  const addDataToSensorDataArr = React.useCallback(
    (newData: ISensorData[]) => {
      setSensorDataArr((prev) => {
        const newDataArr = [...prev]
        for (const item of newData) {
          if (newDataArr.findIndex((i) => `${i.Date}${i.Time}` === `${item.Date}${item.Time}`) === -1) {
            newDataArr.push(item)

            // Update issues
            if (item.Issues) {
              updateSensorDataIssues(item.Issues)
            }
          }
        }

        // sort by time in ascending order
        newDataArr.sort((a, b) => (dayjs(`${a.Date} ${a.Time}`).isAfter(dayjs(`${b.Date} ${b.Time}`)) ? 1 : -1))

        const trimmedData = newDataArr.slice(-120)

        if (trimmedData.length > 0) {
          const latest = trimmedData[trimmedData.length - 1]
          const s = latest.SensorData

          const get = (v?: number) => v?.toFixed(1).toString() ?? 'N/A'

          setData({
            pyrometer: get(s.Pyrometer),
            bet: get(s.KilnInletTemp),
            oxy: get(s.GA01_Oxi),
            load: get(s.KilnDriAmp),
            actualFuel: get(s.ActualFuel),
            actualFuelSP: get(s.ActualFuelSP),
            actualFeedRatePC: get(s.Actual_Feed_Rate_PC),
            actualFeedRateSZ: get(s.Actual_Feed_Rate_SZ),
            alternativeCoalSP: get(s.AlternativeCoalSP),
            avgBZT: get(s.AvgBZT),
            caOf: get(s.CaO_f),
            coalSP: get(s.CoalSP),
            conveyorFlowRate01: get(s.Conveyor_Flow_Rate_01),
            conveyorFlowRate02: get(s.Conveyor_Flow_Rate_02),
            fanSP: get(s.FanSP),
            furnaceSpeed: get(s.FurnaceSpeed),
            furnaceSpeedSP: get(s.FurnaceSpeedSP),
            ga01Oxi: get(s.GA01_Oxi),
            ga02Oxi: get(s.GA02_Oxi),
            ga03Oxi: get(s.GA03_Oxi),
            heatReplaceRatio: get(s.HeatReplaceRatio),
            kilnDriAmp: get(s.KilnDriAmp),
            kilnInletTemp: get(s.KilnInletTemp),
            kilnhoodPressure: get(s.Kilnhood_Pressure),
            materialTowerHeat: get(s.MaterialTowerHeat),
            nox: get(s.Nox),
            recHeadTemp: get(s.RecHeadTemp),
            s03HotMeal: get(s.S03_hot_meal),
            temperatureC2: get(s.Temperature_C2),
            totalHeatConsumption: get(s.TotalHeatConsumption),
            towerOilTemp: get(s.TowerOilTemp),
          })
        }

        return trimmedData
      })
    },
    [updateSensorDataIssues],
  )

  React.useEffect(() => {
    getDataForDashboard.sendRequest(
      {},
      {
        onSuccess: ({ data }) => {
          if (data && Array.isArray(data)) {
            addDataToSensorDataArr(data)
          }
        },
      },
    )
    getDataForDashboard.responseBody?.map((e) => e)
  }, [])

  return (
    <div className='p-4 sm:p-6'>
      <div className='relative flex flex-1 rounded-kc-primary bg-kc-card p-4 shadow-md sm:p-6'>
        <div className='absolute left-4 top-4 z-20 flex gap-2 rounded-md bg-indigo-900 px-3 py-2 text-white'>
          <h3 className='flex-1 text-sm font-bold'>{t('CurrentTime')} :</h3>
          <p className='font-mono·text-xl'>{currentTime.format('YYYY-MM-DD HH:mm:ss')}</p>
        </div>
        <img className='z-0 max-h-[80vh] w-full max-w-full rounded-md object-contain object-center' src={welcomeBanner} alt='Banner' />

        <div className='absolute inset-0 z-10'>
          {/* Pyrometer */}
          <SensorValueBox
            label={t('Pyrometer')}
            value={data.pyrometer ?? 'N/A'}
            unit='°C'
            position={{
              bottom: 'bottom-[23%] sm:bottom-[23%] lg:bottom-[23%] xl:bottom-[23%] 2xl:bottom-[23%] 3xl:bottom-[23%]',
              left: 'left-[60%] sm:left-[60%] lg:left-[60%] xl:left-[60%] 2xl:left-[60%] 3xl:left-[60%]',
              width: 'w-[11%] sm:w-[11%] lg:w-[11%] xl:w-[11%] 2xl:w-[11%] 3xl:w-[11%]',
            }}
            // translate='translate-x-1/2 translate-y-1/2'
            textSize={{
              base: 'text-[6px]',
              sm: 'sm:text-[12px]',
              lg: 'lg:text-[12px]',
              '3xl': '3xl:text-[18px]',
            }}
          />

          {/* BET */}
          <SensorValueBox
            label={t('BET')}
            value={data.bet ?? 'N/A'}
            unit='°C'
            position={{
              bottom: 'bottom-[23%] sm:bottom-[23%] lg:bottom-[23%] xl:bottom-[23%] 2xl:bottom-[23%]',
              left: 'left-[21%] sm:left-[21%] lg:left-[21%] xl:left-[21%] 2xl:left-[21%]',
              width: 'w-[5%] sm:w-[5%] lg:w-[5%] xl:w-[5%] 2xl:w-[5%]',
            }}
            translate='' // Không có translate-x/y trong div gốc
            textSize={{
              base: 'text-[6px]',
              sm: 'sm:text-[12px]',
              lg: 'lg:text-[12px]',
              '3xl': '3xl:text-[18px]',
            }}
          />

          {/* Oxygen */}
          <SensorValueBox
            label={t('Oxy')}
            value={data.oxy ?? 'N/A'}
            unit='%'
            position={{
              bottom: 'bottom-[23%] sm:bottom-[23%] lg:bottom-[23%] xl:bottom-[23%] 2xl:bottom-[23%]',
              left: 'left-[13%] sm:left-[13%] lg:left-[13%] xl:left-[13%] 2xl:left-[13%]',
              width: 'w-[5%] sm:w-[5%] lg:w-[5%] xl:w-[5%] 2xl:w-[5%]',
            }}
            translate='' // Không cần translate vì đoạn gốc không có
            textSize={{
              base: 'text-[6px]',
              sm: 'sm:text-[12px]',
              lg: 'lg:text-[12px]',
              '3xl': '3xl:text-[18px]',
            }}
          />

          {/* Furnace Load */}
          <SensorValueBox
            label='Tải lò'
            value={data.load ?? 'N/A'}
            unit='A'
            position={{
              bottom: 'bottom-[15%] sm:bottom-[15%] lg:bottom-[15%] xl:bottom-[15%] 2xl:bottom-[15%]',
              left: 'left-[40%] sm:left-[40%] lg:left-[40%] xl:left-[40%] 2xl:left-[40%]',
              width: 'w-[9%] sm:w-[9%] lg:w-[9%] xl:w-[9%] 2xl:w-[9%]',
            }}
            translate='' // Không dùng translate nên để trống
            textSize={{
              base: 'text-[6px]',
              sm: 'sm:text-[12px]',
              lg: 'lg:text-[12px]',
              '3xl': '3xl:text-[18px]',
            }}
          />

          {/* dopolFanGasPressure */}
          {/* <div
            className='absolute bottom-[0%] left-[15%]
               w-[6%] rounded bg-black bg-opacity-50 px-0.5 py-0
               text-center leading-tight text-white
               sm:bottom-[85%] sm:left-[75%] sm:w-[9%] sm:px-1 sm:py-1
               lg:bottom-[85%] lg:left-[75%] lg:w-[7%] lg:py-1
               xl:bottom-[85%] xl:left-[75%] xl:w-[5%] xl:px-1 xl:py-1
               2xl:bottom-[40%] lg:left-[4%] 2xl:w-[9%] 2xl:px-1 2xl:py-1'
          >
            <h3 className='text-[6px] font-bold sm:text-[14px] lg:text-[14px]'>{t('dopolFanGasPressure Fuel')}</h3>
            <p className='text-[6px] sm:text-[12px] lg:text-[12px]'>{'4E1GP1JST01_Pressure'} t/h</p>
          </div> */}

          {/* actualFuel */}
          <SensorValueBox
            label={t('actualFuel')}
            value={data.actualFuel ?? 'N/A'}
            unit='t/h'
            position={{
              bottom: 'bottom-[82%] sm:bottom-[82%] lg:bottom-[82%] xl:bottom-[82%] 2xl:bottom-[82%]',
              left: 'left-[60%] sm:left-[60%] lg:left-[60%] xl:left-[60%] 2xl:left-[60%]',
              width: 'w-[8%] sm:w-[8%] lg:w-[8%] xl:w-[8%] 2xl:w-[8%]',
            }}
            translate=''
            textSize={{
              base: 'text-[6px]',
              sm: 'sm:text-[12px]',
              lg: 'lg:text-[12px]',
              '3xl': '3xl:text-[18px]',
            }}
          />

          {/* actualFuelSP */}
          {/* <div
            className='absolute bottom-[0%] left-[15%]
               w-[6%] rounded bg-black bg-opacity-50 px-0.5 py-0
               text-center leading-tight text-white
               sm:bottom-[80%] sm:left-[70%] sm:w-[9%] sm:px-1 sm:py-1
               lg:bottom-[80%] lg:left-[70%] lg:w-[7%] lg:py-1
               xl:bottom-[80%] xl:left-[70%] xl:w-[5%] xl:px-1 xl:py-1
               2xl:bottom-[80%] lg:left-[70%] 2xl:w-[4%] 2xl:px-1 2xl:py-1'
          >
            <h3 className='text-[6px] font-bold sm:text-[14px] lg:text-[14px]'>{t('actualFuelSP')}</h3>
            <p className='text-[6px] sm:text-[12px] lg:text-[12px]'>{actualFuelSP} t/h</p>
          </div> */}

          {/* alternativeCoalSP */}
          {/* <div
            className='absolute bottom-[0%] left-[15%]
               w-[6%] rounded bg-black bg-opacity-50 px-0.5 py-0
               text-center leading-tight text-white
               sm:bottom-[75%] sm:left-[80%] sm:w-[9%] sm:px-1 sm:py-1
               lg:bottom-[75%] lg:left-[80%] lg:w-[7%] lg:py-1
               xl:bottom-[75%] xl:left-[80%] xl:w-[5%] xl:px-1 xl:py-1
               2xl:bottom-[75%] lg:left-[80%] 2xl:w-[4%] 2xl:px-1 2xl:py-1'
          >
            <h3 className='text-[6px] font-bold sm:text-[14px] lg:text-[14px]'>{t('AlternativeCoalSP')}</h3>
            <p className='text-[6px] sm:text-[12px] lg:text-[12px]'>{alternativeCoalSP} t/h</p>
          </div> */}

          {/* avgBZT */}
          <SensorValueBox
            label={t('avgBZT')}
            value={data.avgBZT ?? 'N/A'}
            unit='°C'
            position={{
              bottom: 'bottom-[53%] sm:bottom-[53%] lg:bottom-[53%] xl:bottom-[53%] 2xl:bottom-[53%]',
              left: 'left-[47%] sm:left-[47%] lg:left-[47%] xl:left-[47%] 2xl:left-[47%]',
              width: 'w-[9%] sm:w-[9%] lg:w-[9%] xl:w-[9%] 2xl:w-[9%]',
            }}
            translate=''
            textSize={{
              base: 'text-[6px]',
              sm: 'sm:text-[12px]',
              lg: 'lg:text-[12px]',
              '3xl': '3xl:text-[18px]',
            }}
          />

          {/* caOf */}
          {/* <div
            className='absolute bottom-[0%] left-[15%]
               w-[6%] rounded bg-black bg-opacity-50 px-0.5 py-0
               text-center leading-tight text-white
               sm:bottom-[80%] sm:left-[60%] sm:w-[9%] sm:px-1 sm:py-1
               lg:bottom-[80%] lg:left-[60%] lg:w-[7%] lg:py-1
               xl:bottom-[80%] xl:left-[60%] xl:w-[5%] xl:px-1 xl:py-1
               2xl:bottom-[40%] lg:left-[32%] 2xl:w-[4%] 2xl:px-1 2xl:py-1'
          >
            <h3 className='text-[6px] font-bold sm:text-[14px] lg:text-[14px]'>{t('caOf')}</h3>
            <p className='text-[6px] sm:text-[12px] lg:text-[12px]'>{caOf} t/h</p>
          </div> */}

          {/* coalSP */}
          {/* <div
            className='absolute bottom-[0%] left-[15%]
               w-[6%] rounded bg-black bg-opacity-50 px-0.5 py-0
               text-center leading-tight text-white
               sm:bottom-[80%] sm:left-[55%] sm:w-[9%] sm:px-1 sm:py-1
               lg:bottom-[80%] lg:left-[55%] lg:w-[7%] lg:py-1
               xl:bottom-[80%] xl:left-[55%] xl:w-[5%] xl:px-1 xl:py-1
               2xl:bottom-[80%] lg:left-[55%] 2xl:w-[4%] 2xl:px-1 2xl:py-1'
          >
            <h3 className='text-[6px] font-bold sm:text-[14px] lg:text-[14px]'>{t('coalSP')}</h3>
            <p className='text-[6px] sm:text-[12px] lg:text-[12px]'>{coalSP} t/h</p>
          </div> */}

          {/* fanSP */}
          {/* <div
            className='absolute bottom-[0%] left-[15%]
               w-[6%] rounded bg-black bg-opacity-50 px-0.5 py-0
               text-center leading-tight text-white
               sm:bottom-[80%] sm:left-[80%] sm:w-[9%] sm:px-1 sm:py-1
               lg:bottom-[80%] lg:left-[80%] lg:w-[7%] lg:py-1
               xl:bottom-[80%] xl:left-[80%] xl:w-[5%] xl:px-1 xl:py-1
               2xl:bottom-[80%] lg:left-[80%] 2xl:w-[4%] 2xl:px-1 2xl:py-1'
          >
            <h3 className='text-[6px] font-bold sm:text-[14px] lg:text-[14px]'>{t('fanSP')}</h3>
            <p className='text-[6px] sm:text-[12px] lg:text-[12px]'>{fanSP} t/h</p>
          </div> */}

          {/* furnaceSpeed */}
          <SensorValueBox
            label={t('furnaceSpeed')}
            value={data.furnaceSpeed ?? 'N/A'}
            unit='rpm'
            position={{
              bottom: 'bottom-[90%] sm:bottom-[90%] lg:bottom-[90%] xl:bottom-[90%] 2xl:bottom-[90%]',
              left: 'left-[60%] sm:left-[60%] lg:left-[60%] xl:left-[60%] 2xl:left-[60%]',
              width: 'w-[8%] sm:w-[8%] lg:w-[8%] xl:w-[8%] 2xl:w-[8%]',
            }}
            translate=''
            textSize={{
              base: 'text-[6px]',
              sm: 'sm:text-[12px]',
              lg: 'lg:text-[12px]',
              '3xl': '3xl:text-[18px]',
            }}
          />

          {/* furnaceSpeedSP */}
          {/* <div
            className='absolute bottom-[0%] left-[15%]
               w-[6%] rounded bg-black bg-opacity-50 px-0.5 py-0
               text-center leading-tight text-white
               sm:bottom-[80%] sm:left-[45%] sm:w-[9%] sm:px-1 sm:py-1
               lg:bottom-[80%] lg:left-[45%] lg:w-[7%] lg:py-1
               xl:bottom-[80%] xl:left-[45%] xl:w-[5%] xl:px-1 xl:py-1
               2xl:bottom-[80%] lg:left-[45%] 2xl:w-[4%] 2xl:px-1 2xl:py-1'
          >
            <h3 className='text-[6px] font-bold sm:text-[14px] lg:text-[14px]'>{t('furnaceSpeedSP')}</h3>
            <p className='text-[6px] sm:text-[12px] lg:text-[12px]'>{furnaceSpeedSP} rpm</p>
          </div> */}

          {/* ga01Oxi */}
          {/* <div
            className='absolute bottom-[0%] left-[15%]
               w-[6%] rounded bg-black bg-opacity-50 px-0.5 py-0
               text-center leading-tight text-white
               sm:bottom-[80%] sm:left-[40%] sm:w-[9%] sm:px-1 sm:py-1
               lg:bottom-[80%] lg:left-[40%] lg:w-[7%] lg:py-1
               xl:bottom-[80%] xl:left-[40%] xl:w-[5%] xl:px-1 xl:py-1
               2xl:bottom-[80%] lg:left-[40%] 2xl:w-[4%] 2xl:px-1 2xl:py-1'
          >
            <h3 className='text-[6px] font-bold sm:text-[14px] lg:text-[14px]'>{t('ga01Oxi')}</h3>
            <p className='text-[6px] sm:text-[12px] lg:text-[12px]'>{ga01Oxi} t/h</p>
          </div> */}

          {/* ga02Oxi */}
          <SensorValueBox
            label={t('ga02Oxi')}
            value={data.ga02Oxi ?? 'N/A'}
            unit='%'
            position={{
              bottom: 'bottom-[65%] sm:bottom-[65%] lg:bottom-[65%] xl:bottom-[65%] 2xl:bottom-[65%] 3xl:bottom-[65%]',
              left: 'left-[21%] sm:left-[21%] lg:left-[21%] xl:left-[21%] 2xl:left-[21%] 3xl:left-[21%]',
              width: 'w-[6%] sm:w-[6%] lg:w-[6%] xl:w-[6%] 2xl:w-[6%]',
            }}
            translate=''
            textSize={{
              base: 'text-[6px]',
              sm: 'sm:text-[12px]',
              lg: 'lg:text-[12px]',
              '3xl': '3xl:text-[18px]',
            }}
          />

          {/* ga03Oxi */}
          <SensorValueBox
            label={t('ga03Oxi')}
            value={data.ga03Oxi ?? 'N/A'}
            unit='%'
            position={{
              bottom: 'bottom-[65%] sm:bottom-[65%] lg:bottom-[65%] xl:bottom-[65%] 2xl:bottom-[65%]',
              left: 'left-[33%] sm:left-[33%] lg:left-[33%] xl:left-[33%] 2xl:left-[33%]',
              width: 'w-[6%] sm:w-[6%] lg:w-[6%] xl:w-[6%] 2xl:w-[6%]',
            }}
            translate=''
            textSize={{
              base: 'text-[6px]',
              sm: 'sm:text-[12px]',
              lg: 'lg:text-[12px]',
              '3xl': '3xl:text-[18px]',
            }}
          />

          {/* kilnDriAmp */}
          <SensorValueBox
            label={t('kilnDriAmp')}
            value={data.kilnDriAmp ?? 'N/A'}
            unit='A'
            position={{
              bottom: 'bottom-[31%] sm:bottom-[31%] lg:bottom-[31%] xl:bottom-[31%] 2xl:bottom-[31%]',
              left: 'left-[40%] sm:left-[40%] lg:left-[40%] xl:left-[40%] 2xl:left-[40%]',
              width: 'w-[9%] sm:w-[9%] lg:w-[9%] xl:w-[9%] 2xl:w-[9%]',
            }}
            translate=''
            textSize={{
              base: 'text-[6px]',
              sm: 'sm:text-[12px]',
              lg: 'lg:text-[12px]',
              '3xl': '3xl:text-[18px]',
            }}
          />

          {/* kilnInletTemp */}
          {/* <div
            className='absolute bottom-[0%] left-[15%]
               w-[6%] rounded bg-black bg-opacity-50 px-0.5 py-0
               text-center leading-tight text-white
               sm:bottom-[75%] sm:left-[75%] sm:w-[9%] sm:px-1 sm:py-1
               lg:bottom-[75%] lg:left-[75%] lg:w-[7%] lg:py-1
               xl:bottom-[75%] xl:left-[75%] xl:w-[5%] xl:px-1 xl:py-1
               2xl:bottom-[75%] lg:left-[75%] 2xl:w-[4%] 2xl:px-1 2xl:py-1'
          >
            <h3 className='text-[6px] font-bold sm:text-[14px] lg:text-[14px]'>{t('kilnInletTemp')}</h3>
            <p className='text-[6px] sm:text-[12px] lg:text-[12px]'>{kilnInletTemp} t/h</p>
          </div> */}

          {/* materialTowerHeat */}
          <SensorValueBox
            label={t('materialTowerHeat')}
            value={data.materialTowerHeat ?? 'N/A'}
            unit='°C'
            position={{
              bottom: 'bottom-[38%] sm:bottom-[38%] lg:bottom-[38%] xl:bottom-[38%] 2xl:bottom-[38%]',
              left: 'left-[13%] sm:left-[13%] lg:left-[13%] xl:left-[13%] 2xl:left-[13%]',
              width: 'w-[11%] sm:w-[11%] lg:w-[11%] xl:w-[12%] 2xl:w-[11%]',
            }}
            translate=''
            textSize={{
              base: 'text-[6px]',
              sm: 'sm:text-[12px]',
              lg: 'lg:text-[12px]',
              '3xl': '3xl:text-[18px]',
            }}
          />

          {/* nox */}
          {/* <div
            className='absolute bottom-[0%] left-[15%]
               w-[6%] rounded bg-black bg-opacity-50 px-0.5 py-0
               text-center leading-tight text-white
               sm:bottom-[75%] sm:left-[65%] sm:w-[9%] sm:px-1 sm:py-1
               lg:bottom-[75%] lg:left-[65%] lg:w-[7%] lg:py-1
               xl:bottom-[75%] xl:left-[65%] xl:w-[5%] xl:px-1 xl:py-1
               2xl:bottom-[75%] lg:left-[65%] 2xl:w-[4%] 2xl:px-1 2xl:py-1'
          >
            <h3 className='text-[6px] font-bold sm:text-[14px] lg:text-[14px]'>{t('nox')}</h3>
            <p className='text-[6px] sm:text-[12px] lg:text-[12px]'>{nox} t/h</p>
          </div> */}

          {/* recHeadTemp */}
          {/* <div
            className='absolute bottom-[0%] left-[15%]
               w-[6%] rounded bg-black bg-opacity-50 px-0.5 py-0
               text-center leading-tight text-white
               sm:bottom-[75%] sm:left-[60%] sm:w-[9%] sm:px-1 sm:py-1
               lg:bottom-[75%] lg:left-[60%] lg:w-[7%] lg:py-1
               xl:bottom-[75%] xl:left-[60%] xl:w-[5%] xl:px-1 xl:py-1
               2xl:bottom-[75%] lg:left-[60%] 2xl:w-[4%] 2xl:px-1 2xl:py-1'
          >
            <h3 className='text-[6px] font-bold sm:text-[14px] lg:text-[14px]'>{t('recHeadTemp')}</h3>
            <p className='text-[6px] sm:text-[12px] lg:text-[12px]'>{recHeadTemp} t/h</p>
          </div> */}

          {/* s03HotMeal */}
          {/* <div
            className='absolute bottom-[0%] left-[15%]
               w-[6%] rounded bg-black bg-opacity-50 px-0.5 py-0
               text-center leading-tight text-white
               sm:bottom-[80%] sm:left-[80%] sm:w-[9%] sm:px-1 sm:py-1
               lg:bottom-[80%] lg:left-[80%] lg:w-[7%] lg:py-1
               xl:bottom-[80%] xl:left-[80%] xl:w-[5%] xl:px-1 xl:py-1
               2xl:bottom-[80%] lg:left-[80%] 2xl:w-[4%] 2xl:px-1 2xl:py-1'
          >
            <h3 className='text-[6px] font-bold sm:text-[14px] lg:text-[14px]'>{t('s03HotMeal')}</h3>
            <p className='text-[6px] sm:text-[12px] lg:text-[12px]'>{s03HotMeal} t/h</p>
          </div> */}

          {/* totalHeatConsumption */}
          {/* <div
            className='absolute bottom-[0%] left-[15%]
               w-[6%] rounded bg-black bg-opacity-50 px-0.5 py-0
               text-center leading-tight text-white
               sm:bottom-[80%] sm:left-[80%] sm:w-[9%] sm:px-1 sm:py-1
               lg:bottom-[80%] lg:left-[80%] lg:w-[7%] lg:py-1
               xl:bottom-[80%] xl:left-[80%] xl:w-[5%] xl:px-1 xl:py-1
               2xl:bottom-[80%] lg:left-[80%] 2xl:w-[4%] 2xl:px-1 2xl:py-1'
          >
            <h3 className='text-[6px] font-bold sm:text-[14px] lg:text-[14px]'>{t('totalHeatConsumption')}</h3>
            <p className='text-[6px] sm:text-[12px] lg:text-[12px]'>{totalHeatConsumption} t/h</p>
          </div> */}

          {/* towerOilTemp */}
          {/* <div
            className='absolute bottom-[0%] left-[15%]
               w-[6%] rounded bg-black bg-opacity-50 px-0.5 py-0
               text-center leading-tight text-white
               sm:bottom-[80%] sm:left-[80%] sm:w-[9%] sm:px-1 sm:py-1
               lg:bottom-[80%] lg:left-[80%] lg:w-[7%] lg:py-1
               xl:bottom-[80%] xl:left-[80%] xl:w-[5%] xl:px-1 xl:py-1
               2xl:bottom-[80%] lg:left-[80%] 2xl:w-[4%] 2xl:px-1 2xl:py-1'
          >
            <h3 className='text-[6px] font-bold sm:text-[14px] lg:text-[14px]'>{t('towerOilTemp')}</h3>
            <p className='text-[6px] sm:text-[12px] lg:text-[12px]'>{towerOilTemp} t/h</p>
          </div> */}

          {/* Actual_Feed_Rate_PC */}
          <SensorValueBox
            label={t('actualFeedRatePC')}
            value={data.actualFeedRatePC ?? 'N/A'}
            unit='t/h'
            position={{
              bottom: 'bottom-[82%] sm:bottom-[82%] lg:bottom-[82%] xl:bottom-[82%] 2xl:bottom-[82%]',
              left: 'left-[69%] sm:left-[69%] lg:left-[69%] xl:left-[69%] 2xl:left-[69%]',
              width: 'w-[12%] sm:w-[12%] lg:w-[12%] xl:w-[12%] 2xl:w-[12%]',
            }}
            translate=''
            textSize={{
              base: 'text-[6px]',
              sm: 'sm:text-[12px]',
              lg: 'lg:text-[12px]',
              '3xl': '3xl:text-[18px]',
            }}
          />

          {/* actualFeedRateSZ */}
          <SensorValueBox
            label={t('actualFeedRateSZ')}
            value={data.actualFeedRateSZ ?? 'N/A'}
            unit='t/h'
            position={{
              bottom: 'bottom-[82%] sm:bottom-[82%] lg:bottom-[82%] xl:bottom-[82%] 2xl:bottom-[82%]',
              left: 'left-[82%] sm:left-[82%] lg:left-[82%] xl:left-[82%] 2xl:left-[82%]',
              width: 'w-[12%] sm:w-[12%] lg:w-[12%] xl:w-[12%] 2xl:w-[12%]',
            }}
            translate=''
            textSize={{
              base: 'text-[6px]',
              sm: 'sm:text-[12px]',
              lg: 'lg:text-[12px]',
              '3xl': '3xl:text-[18px]',
            }}
          />

          {/* conveyorFlowRate01 */}
          <SensorValueBox
            label={t('conveyorFlowRate01')}
            value={data.conveyorFlowRate01 ?? 'N/A'}
            unit='A'
            position={{
              bottom: 'bottom-[90%] sm:bottom-[90%] lg:bottom-[90%] xl:bottom-[90%] 2xl:bottom-[90%]',
              left: 'left-[69%] sm:left-[69%] lg:left-[69%] xl:left-[69%] 2xl:left-[69%]',
              width: 'w-[12%] sm:w-[12%] lg:w-[12%] xl:w-[12%] 2xl:w-[12%]',
            }}
            translate=''
            textSize={{
              base: 'text-[6px]',
              sm: 'sm:text-[12px]',
              lg: 'lg:text-[12px]',
              '3xl': '3xl:text-[18px]',
            }}
          />

          {/* conveyorFlowRate02 */}
          <SensorValueBox
            label={t('conveyorFlowRate02')}
            value={data.conveyorFlowRate02 ?? 'N/A'}
            unit='A'
            position={{
              bottom: 'bottom-[90%] sm:bottom-[90%] lg:bottom-[90%] xl:bottom-[90%] 2xl:bottom-[90%]',
              left: 'left-[82%] sm:left-[82%] lg:left-[82%] xl:left-[82%] 2xl:left-[82%]',
              width: 'w-[12%] sm:w-[12%] lg:w-[12%] xl:w-[12%] 2xl:w-[12%]',
            }}
            translate=''
            textSize={{
              base: 'text-[6px]',
              sm: 'sm:text-[12px]',
              lg: 'lg:text-[12px]',
              '3xl': '3xl:text-[18px]',
            }}
          />

          {/* temperatureC2 */}
          <SensorValueBox
            label={t('temperatureC2')}
            value={data.temperatureC2 ?? 'N/A'}
            unit='°C'
            position={{
              bottom: 'bottom-[65%] sm:bottom-[65%] lg:bottom-[65%] xl:bottom-[65%] 2xl:bottom-[65%]',
              left: 'left-[47%] sm:left-[47%] lg:left-[47%] xl:left-[47%] 2xl:left-[47%]',
              width: 'w-[9%] sm:w-[9%] lg:w-[9%] xl:w-[9%] 2xl:w-[9%]',
            }}
            translate=''
            textSize={{
              base: 'text-[6px]',
              sm: 'sm:text-[12px]',
              lg: 'lg:text-[12px]',
              '3xl': '3xl:text-[18px]',
            }}
          />

          {/* kilnhoodPressure */}
          <SensorValueBox
            label={t('kilnhoodPressure')}
            value={data.kilnhoodPressure ?? 'N/A'}
            unit='mBar  '
            position={{
              bottom: 'bottom-[31%] sm:bottom-[31%] lg:bottom-[31%] xl:bottom-[31%] 2xl:bottom-[31%]',
              left: 'left-[60%] sm:left-[60%] lg:left-[60%] xl:left-[60%] 2xl:left-[60%]',
              width: 'w-[11%] sm:w-[11%] lg:w-[11%] xl:w-[11%] 2xl:w-[11%]',
            }}
            translate=''
            textSize={{
              base: 'text-[6px]',
              sm: 'sm:text-[12px]',
              lg: 'lg:text-[12px]',
              '3xl': '3xl:text-[18px]',
            }}
          />
        </div>
      </div>
    </div>
  )
}
