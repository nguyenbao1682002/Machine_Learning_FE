import dayjs from 'dayjs'
import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material'
import { useTranslation } from 'react-i18next'

interface FeedbackItem {
  datetime_uuid: Date | string
  description: string
  issue_type: string
  target: string
  logic: string
  timestamp: Date | string
}

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 18,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 16,
  },
}))

interface DiaryTableProps {
  feedbackList?: FeedbackItem[]
}

const DiaryTable = ({ feedbackList }: DiaryTableProps) => {
  const { t } = useTranslation()

  // Kiểm tra nếu không có dữ liệu hoặc mảng rỗng
  if (!feedbackList || feedbackList.length === 0) {
    return <div className='text-center text-base font-semibold'>{t('Hiện tại không có dữ liệu nào')}</div>
  }

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '100%' }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>Thời gian</StyledTableCell>
            <StyledTableCell align='center'>Loại vấn đề</StyledTableCell>
            <StyledTableCell align='center'>Chi tiết</StyledTableCell>
            <StyledTableCell align='center'>Mô tả</StyledTableCell>
            <StyledTableCell align='center'>Khu vực</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {feedbackList.map((item, i) => {
            const day = dayjs(item.timestamp)
            return (
              <TableRow key={i}>
                <StyledTableCell align='center'>{day.format('YYYY-MM-DD HH:mm:ss')}</StyledTableCell>
                <StyledTableCell align='center'>{item.issue_type}</StyledTableCell>
                <StyledTableCell align='left'>{item.logic}</StyledTableCell>
                <StyledTableCell align='left'>{item.description}</StyledTableCell>
                <StyledTableCell align='center'>{item.target}</StyledTableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default DiaryTable
