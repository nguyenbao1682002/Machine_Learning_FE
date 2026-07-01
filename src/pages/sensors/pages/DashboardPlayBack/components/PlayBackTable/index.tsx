import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material'
import { useTranslation } from 'react-i18next'
import { IQueryFeedbackResponse } from '~shared/types/functions/data'
import { FeedbackTableItem } from './components/FeedbackTableItem'

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

interface FeedbackTable {
  feedbackList?: IQueryFeedbackResponse[] | undefined
}

const PlayBackTable = (props: FeedbackTable) => {
  const { t } = useTranslation()

  return (
    <>
      {props.feedbackList?.length === 0 ? (
        <div className='text-center text-base font-semibold'>{t('NoDataAvailable')}</div>
      ) : (
        <TableContainer component={Paper}>
          <Table sx={{ minWidth: '100%' }} aria-label='customized table'>
            <TableHead>
              <TableRow>
                <StyledTableCell align='center'>Ngày phản hồi</StyledTableCell>
                <StyledTableCell align='center'>Giờ phản hồi</StyledTableCell>
                <StyledTableCell align='center'>Người phản hồi</StyledTableCell>
                <StyledTableCell align='center'>Nội dung ghi chú</StyledTableCell>
                <StyledTableCell align='center'>Hành động</StyledTableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {props.feedbackList?.map((item, i) => (
                <FeedbackTableItem key={i} feedback={item} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </>
  )
}

export default PlayBackTable
