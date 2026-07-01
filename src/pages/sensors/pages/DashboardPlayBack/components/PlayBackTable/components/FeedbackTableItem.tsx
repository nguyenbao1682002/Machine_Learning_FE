import { TableCell, TableRow, styled, tableCellClasses } from '@mui/material'
import React from 'react'
import { KCButton, KCModal } from '~components'
import { KCModalActions } from '~components/KCModal/types'
import { IQueryFeedbackResponse } from '~shared/types/functions/data'
import PlaybackModal from '../../PlaybackModal'

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

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}))

interface FeedbackTableItemProps {
  feedback?: IQueryFeedbackResponse | undefined
}

export const FeedbackTableItem = (props: FeedbackTableItemProps) => {
  const modalRef = React.useRef<KCModalActions>(null)

  return (
    <StyledTableRow key={props.feedback?.Hash}>
      <StyledTableCell align='center'>{props.feedback?.Date.toString()}</StyledTableCell>
      <StyledTableCell align='center'>{props.feedback?.Time.toString()}</StyledTableCell>
      <StyledTableCell align='center'>{props.feedback?.Feedback?.User}</StyledTableCell>
      <StyledTableCell align='center' style={{ width: '800px' }}>
        {props.feedback?.Feedback?.Note}
      </StyledTableCell>
      <StyledTableCell align='center'>
        <KCButton
          onClick={() => {
            modalRef.current?.open()
          }}
          className='h-10 cursor-pointer rounded bg-kc-highlight p-2 font-semibold text-white hover:opacity-75'
        >
          Chi tiết
        </KCButton>
        <KCModal ref={modalRef}>
          <PlaybackModal closeModal={() => modalRef.current?.close()} item={props.feedback} />
        </KCModal>
      </StyledTableCell>
    </StyledTableRow>
  )
}
