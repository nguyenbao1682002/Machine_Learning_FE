import ReactECharts from 'echarts-for-react'
import React from 'react'
import { randomRGBColor } from '~shared/utils'

export type KCEChartsV2Props = {
  xAxisValues: string[]
  yAxisLines: {
    name: string
    color: string
    values: (number | null)[]
    predictionValues?: (number | null)[]
    predictionColor?: string
    pastTrendValues?: (number | null)[]
    pastTrendColor?: string
  }[]
}

KCEChartsV2.defaultProps = {}

export function KCEChartsV2(props: KCEChartsV2Props) {
  const chartRef = React.useRef(null)
  const [minValue, setMinValue] = React.useState<number>(0)
  const [maxValue, setMaxValue] = React.useState<number>(0)

  const series = React.useMemo(() => {
    const result: any[] = []
    for (const yAxisLine of props.yAxisLines) {
      setMinValue(Math.min(...(yAxisLine.values.filter((e) => e !== null) as number[])))
      setMaxValue(Math.max(...(yAxisLine.values.filter((e) => e !== null) as number[])))
      result.push({
        name: yAxisLine.name,
        type: 'line',
        symbol: 'none',
        sampling: 'lttb',
        color: yAxisLine.color ?? randomRGBColor(),
        data: yAxisLine.values.map((val) => Number(val).toFixed(2)),
      })
      if (yAxisLine.predictionValues && yAxisLine.predictionValues.length > 0) {
        result.push({
          name: 'Future prediction',
          type: 'line',
          symbol: 'none',
          sampling: 'lttb',
          color: yAxisLine.predictionColor ?? yAxisLine.color ?? randomRGBColor(),
          lineStyle: {
            color: yAxisLine.predictionColor ?? yAxisLine.color ?? randomRGBColor(),
            type: 'dashed',
          },
          data: [
            [yAxisLine.values.length - 1, Number(yAxisLine.values[yAxisLine.values.length - 1])?.toFixed(2)],
            ...yAxisLine.predictionValues.map((value, idx) => [yAxisLine.values.length + idx, value !== undefined && value !== null ? Number(value)?.toFixed(2) : null]),
          ],
        })
      }

      if (yAxisLine.pastTrendValues && yAxisLine.pastTrendValues.length > 0) {
        result.push({
          name: 'Past trend',
          type: 'line',
          symbol: 'none',
          sampling: 'lttb',
          color: yAxisLine.pastTrendColor ?? yAxisLine.color ?? randomRGBColor(),
          lineStyle: {
            color: yAxisLine.pastTrendColor ?? yAxisLine.color ?? randomRGBColor(),
          },
          data: [
            ...yAxisLine.pastTrendValues.map((value, idx) => [
              Math.max((yAxisLine.values?.length ?? 0) - (yAxisLine.pastTrendValues?.length ?? 0), 0) + idx,
              Number(value)?.toFixed(2),
            ]),
          ],
        })
      }
    }
    return result
  }, [props.xAxisValues])

  const deltaMinMax = Math.abs(maxValue - minValue) + 0.6

  const options = React.useMemo(() => {
    return {
      tooltip: {
        trigger: 'axis',
      },
      grid: {
        top: 16,
        left: '3%',
        right: '4%',
        bottom: '3%',
        containLabel: true,
      },

      xAxis: {
        type: 'category',
        boundaryGap: false,
        data: props.xAxisValues,
      },
      yAxis: {
        type: 'value',
        boundaryGap: [0, '100%'],
        min: Math.round(Math.max(0, minValue - deltaMinMax / 2)),
        max: Math.round(maxValue + deltaMinMax / 2),
      },
      series: series,
    }
  }, [props.xAxisValues, props.yAxisLines, minValue, maxValue])

  return <ReactECharts ref={chartRef} option={options} style={{ height: 290 }} />
}
