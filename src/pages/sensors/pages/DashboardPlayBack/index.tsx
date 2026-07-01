import dayjs from 'dayjs'
import React, { ChangeEvent, useMemo, useState } from 'react'
import i18next from 'i18next'
import { DatePicker } from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { FormControl, InputLabel, Select, MenuItem, OutlinedInput, Box, Chip, Button } from '@mui/material'
import { useGetDiaryData } from './apis/useGetDiaryData'
import DiaryTable from './components/DiaryTable'

interface IFormState {
  dateStart: Date
  dateEnd: Date
  pageSize: number
  issueType: string[]
  target: string[]
}

const ISSUE_TYPE_OPTIONS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Nhắc nhở', value: 'NHẮC NHỞ' },
  { label: 'Sự cố', value: 'SỰ CỐ' },
  { label: 'Khuyến nghị', value: 'KHUYẾN NGHỊ' },
]

const TARGET_OPTIONS = [
  { label: 'Tất cả', value: 'all' },
  { label: 'Bin trung tâm', value: 'Bin trung tâm' },
  { label: 'Nhiệt outlet C2', value: 'Nhiệt outlet C2' },
  { label: 'Nhiệt outlet C1', value: 'Nhiệt outlet C1' },
  { label: 'Hệ thống phân tích khí Ga01,2,3,4', value: 'Hệ thống phân tích khí Ga01,2,3,4' },
  { label: 'Quạt ID', value: 'Quạt ID' },
  { label: 'Đầu lò', value: 'Đầu lò' },
  { label: 'Lò nung', value: 'Lò nung' },
  { label: 'Cooler', value: 'Cooler' },
  { label: 'Rawmeal Silo', value: 'Rawmeal Silo' },
  { label: 'Hệ thống phân tích khí GA02,3,4', value: 'Hệ thống phân tích khí GA02,3,4' },
  { label: 'Thông số điều khiển', value: 'Thông số điều khiển' },
]

const PAGE_SIZE_OPTIONS = [
  { label: 5, value: 5 },
  { label: 10, value: 10 },
  { label: 20, value: 20 },
  { label: 30, value: 30 },
  { label: 50, value: 50 },
  { label: 100, value: 100 },
]

const formDefaultValues: IFormState = {
  dateStart: dayjs().toDate(),
  dateEnd: dayjs().toDate(),
  pageSize: 20,
  issueType: ['all'],
  target: ['all'],
}

export function DashboardPlayBack() {
  const { t } = i18next

  // Use useState to form management
  const [formState, setFormState] = useState<IFormState>(formDefaultValues)
  const [currentPage, setCurrentPage] = useState(1)
  const [shouldFetch, setShouldFetch] = useState(true) // State to control call API
  const diaryList = useGetDiaryData()

  // Handle for DatePicker
  const handleDateChange = (name: keyof IFormState, date: Date | null) => {
    if (date) {
      setFormState((prevState) => ({
        ...prevState,
        [name]: date,
      }))
    }
  }

  // Handle for Select field
  const handleMuiSelectChange = (name: keyof IFormState) => (event: any) => {
    const {
      target: { value },
    } = event
    let newValues = typeof value === 'string' ? value.split(',') : value

    // Solve special logic for 'all'
    if (newValues.includes('all') && newValues.length > 1) {
      newValues = ['all']
    } else if (newValues.length > 1 && newValues[0] === 'all') {
      newValues = newValues.slice(1)
    }
    setFormState((prevState) => ({
      ...prevState,
      [name]: newValues,
    }))
  }

  // Handle for single-select field (like PageSize)
  const handleMuiSingleSelectChange = (name: keyof IFormState) => (event: any) => {
    setFormState((prevState) => ({
      ...prevState,
      [name]: event.target.value,
    }))
    setCurrentPage(1) // Reset to page 1 when pageSize changes
    setShouldFetch(true) // Fetch data for the new page size
  }

  // Handle click filter button action
  const handleFilter = () => {
    setCurrentPage(1) // Reset into the first page when filter
    setShouldFetch(true) // Allow call API
  }

  const queryAction = { action: 'playback__get_data' }

  const queryParams = useMemo(() => {
    const queryDateStart = dayjs.tz(formState.dateStart).format('YYYY-MM-DD')
    const queryDateEnd = dayjs.tz(formState.dateEnd).endOf('day').format('YYYY-MM-DD')
    return {
      filter: {
        startDate: `${queryDateStart} 00:00:00`,
        endDate: `${queryDateEnd} 23:59:00`,
        issue_type: formState.issueType.includes('all') ? undefined : formState.issueType,
        target: formState.target.includes('all') ? undefined : formState.target,
      },
      pagination: currentPage,
      page_size: formState.pageSize,
    }
  }, [formState, currentPage])

  const finalPayload = useMemo(() => {
    return {
      ...queryAction,
      payload: queryParams,
    }
  }, [queryParams])

  React.useEffect(() => {
    if (shouldFetch) {
      diaryList.sendRequest(finalPayload)
      setShouldFetch(false) // Turn off flag after called API
    }
  }, [shouldFetch, finalPayload])

  return (
    <div className='flex size-full flex-col gap-3 p-6'>
      <div className='flex items-center gap-10 rounded-kc-primary bg-kc-card p-6 shadow-md'>
        <div className='flex flex-col items-center gap-4'>
          <div className='flex h-10 items-center gap-2 font-medium'>
            <span>{t('StartDate')}:</span>
            <DatePicker
              selected={formState.dateStart}
              onChange={(date: Date | null) => handleDateChange('dateStart', date)}
              dateFormat='dd/MM/yyyy'
              className='w-40 rounded-md border p-2'
              maxDate={dayjs().endOf('day').toDate()}
            />
          </div>

          <div className='flex h-10 items-center gap-2 font-medium'>
            <span>{t('EndDate')}:</span>
            <DatePicker
              selected={formState.dateEnd}
              onChange={(date: Date | null) => handleDateChange('dateEnd', date)}
              dateFormat='dd/MM/yyyy'
              className='w-40 rounded-md border p-2'
              maxDate={dayjs().endOf('day').toDate()}
            />
          </div>
        </div>

        <FormControl sx={{ width: 350, mt: 0 }}>
          <InputLabel id='issue-type-label'>{t('IssueType')}</InputLabel>
          <Select
            labelId='issue-type-label'
            multiple
            value={formState.issueType}
            onChange={handleMuiSelectChange('issueType')}
            input={<OutlinedInput id='select-multiple-chip' label={t('IssueType')} />}
            renderValue={(selected) => (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.5,
                  height: 60, // Cố định chiều cao
                  overflowY: 'auto', // Thêm scrollbar khi tràn
                  scrollbarWidth: 'thin', // Dùng cho Firefox
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,.1)',
                    borderRadius: '4px',
                  },
                }}
              >
                {selected.map((value) => {
                  const label = ISSUE_TYPE_OPTIONS.find((opt) => opt.value === value)?.label || value
                  return <Chip key={value} label={label} sx={{ backgroundColor: 'Highlight', color: 'white' }} />
                })}
              </Box>
            )}
          >
            {ISSUE_TYPE_OPTIONS.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{
                  backgroundColor: formState.issueType.includes(option.value) ? 'rgba(0, 0, 0, 0.08)' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: 250, mt: 0 }}>
          <InputLabel id='target-label'>{t('Area')}</InputLabel>
          <Select
            labelId='target-label'
            multiple
            value={formState.target}
            onChange={handleMuiSelectChange('target')}
            input={<OutlinedInput id='select-multiple-chip' label={t('Area')} />}
            renderValue={(selected) => (
              <Box
                sx={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 0.5,
                  height: 60, // Cố định chiều cao
                  overflowY: 'auto', // Thêm scrollbar khi tràn
                  scrollbarWidth: 'thin', // Dùng cho Firefox
                  '&::-webkit-scrollbar': {
                    width: '8px',
                  },
                  '&::-webkit-scrollbar-thumb': {
                    backgroundColor: 'rgba(0,0,0,.1)',
                    borderRadius: '4px',
                  },
                }}
              >
                {selected.map((value) => {
                  const label = TARGET_OPTIONS.find((opt) => opt.value === value)?.label || value
                  return <Chip key={value} label={label} sx={{ backgroundColor: 'Highlight', color: 'white' }} />
                })}
              </Box>
            )}
          >
            {TARGET_OPTIONS.map((option) => (
              <MenuItem
                key={option.value}
                value={option.value}
                sx={{
                  backgroundColor: formState.issueType.includes(option.value) ? 'rgba(0, 0, 0, 0.08)' : 'inherit',
                  '&:hover': {
                    backgroundColor: 'rgba(0, 0, 0, 0.04)',
                  },
                }}
              >
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl sx={{ width: 100, mt: 0 }}>
          <InputLabel id='page-size-label'>{t('Size')}</InputLabel>
          <Select
            labelId='page-size-label'
            value={formState.pageSize}
            onChange={handleMuiSingleSelectChange('pageSize')}
            input={<OutlinedInput id='select-page-size' label={t('Size')} />}
          >
            {PAGE_SIZE_OPTIONS.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Button variant='contained' onClick={handleFilter} sx={{ height: 40, alignSelf: 'center' }}>
          {t('Filter')}
        </Button>
      </div>
      <DiaryTable feedbackList={Array.isArray(diaryList.responseBody?.data) ? diaryList.responseBody?.data : diaryList.responseBody?.data ? [diaryList.responseBody.data] : []} />
    </div>
  )
}
