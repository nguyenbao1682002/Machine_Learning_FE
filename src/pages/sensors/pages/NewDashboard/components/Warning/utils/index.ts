import dayjs from 'dayjs'
import { SensorDataIssue } from '~shared/types/functions/data'

export const renderIssueDataTime = (issue: SensorDataIssue) => {
  if (issue.SensorDataInfo) {
    return dayjs(`${issue.SensorDataInfo.Date} ${issue.SensorDataInfo.Time}`, 'YYYY-MM-DD HH:mm:ss').format('DD/MM/YYYY HH:mm A')
  }
  return issue.Date
}
