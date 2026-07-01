import { Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, styled, tableCellClasses } from '@mui/material'
import i18next from 'i18next'
import { ISensorData } from '~shared/types/functions/data'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: 14,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
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

interface ModalRightProps {
  allStats?: ISensorData[] | undefined
}

export const ModalTable = (props: ModalRightProps) => {
  const { t } = i18next
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: '100%' }} aria-label='customized table'>
        <TableHead>
          <TableRow>
            <StyledTableCell align='center'>
              <div className='text-sm'>{t('Thông tin')}</div>
            </StyledTableCell>
            {props.allStats?.map((stat, i) => (
              <StyledTableCell key={i} align='center'>
                <div className='text-sm'> {stat.Time}</div>
              </StyledTableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          <StyledTableRow>
            <StyledTableCell>{t('Trạng thái lò')}</StyledTableCell>
            {props.allStats?.map((stat, i) => (
              <StyledTableCell key={i} align='center'>
                {stat.Prediction?.GeneralStatus === 'Stable' ? t('Ổn định') : t('Không ổn định')}
              </StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>{t('Nhiệt đầu lò')}</StyledTableCell>
            {props.allStats?.map((stat, i) => (
              <StyledTableCell key={i} align='center'>
                {stat.SensorData?.KilnInletTemp?.toFixed(1)}
              </StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>Oxy</StyledTableCell>
            {props.allStats?.map((stat, i) => (
              <StyledTableCell key={i} align='center'>
                {stat.SensorData?.GA01_Oxi?.toFixed(1)}
              </StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>{t('Pyrometer')}</StyledTableCell>
            {props.allStats?.map((stat, i) => (
              <StyledTableCell key={i} align='center'>
                {stat.SensorData?.Pyrometer?.toFixed(1)}
              </StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>{t('Tải lò')}</StyledTableCell>
            {props.allStats?.map((stat, i) => (
              <StyledTableCell key={i} align='center'>
                {stat.SensorData?.KilnDriAmp?.toFixed(1)}
              </StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>{t('Nox')}</StyledTableCell>
            {props.allStats?.map((stat, i) => (
              <StyledTableCell key={i} align='center'>
                {stat.SensorData?.Nox?.toFixed(1)}
              </StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>{t('Hàm lượng SO3')}</StyledTableCell>
            {props.allStats?.map((stat, i) => (
              <StyledTableCell key={i} align='center'>
                {stat.SensorData?.S03_hot_meal?.toFixed(1)}
              </StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>{t('Vôi tự do')}</StyledTableCell>
            {props.allStats?.map((stat, i) => (
              <StyledTableCell key={i} align='center'>
                {stat.SensorData?.CaO_f?.toFixed(1)}
              </StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>{t('Đề xuất điều chỉnh tốc độ quạt')}</StyledTableCell>
            {props.allStats?.map((stat, i) => (
              <StyledTableCell key={i} align='center'>
                {stat.Prediction?.RecommendationActions?.FanSP && stat.Prediction?.RecommendationActions?.FanSP > 0 ? t('Tăng') : t('Giảm')}
              </StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>{t('Setpoint tốc độ quạt')}</StyledTableCell>
            {props.allStats?.map((stat, i) => (
              <StyledTableCell key={i} align='center'>
                {stat.SensorData?.FanSP}
              </StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>{t('Đề xuất điều chỉnh tốc độ lò')}</StyledTableCell>
            {props.allStats?.map((stat, i) => (
              <StyledTableCell key={i} align='center'>
                {stat.Prediction?.RecommendationActions?.FurnaceSpeedSP && stat.Prediction?.RecommendationActions?.FurnaceSpeedSP > 0 ? t('Tăng') : t('Giảm')}
              </StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>{t('Setpoint tốc độ lò')}</StyledTableCell>
            {props.allStats?.map((stat, i) => (
              <StyledTableCell key={i} align='center'>
                {stat.SensorData?.FurnaceSpeedSP?.toFixed(1)}
              </StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>{t('Đề xuất điều chỉnh tốc độ cấp than')}</StyledTableCell>
            {props.allStats?.map((stat, i) => (
              <StyledTableCell key={i} align='center'>
                {stat.Prediction?.RecommendationActions?.CoalSP && stat.Prediction?.RecommendationActions?.CoalSP > 0 ? t('Tăng') : t('Giảm')}
              </StyledTableCell>
            ))}
          </StyledTableRow>
          <StyledTableRow>
            <StyledTableCell>{t('Setpoint tốc độ cấp than')}</StyledTableCell>
            {props.allStats?.map((stat, i) => (
              <StyledTableCell key={i} align='center'>
                {stat.SensorData?.CoalSP?.toFixed(1)}
              </StyledTableCell>
            ))}
          </StyledTableRow>
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default ModalTable
