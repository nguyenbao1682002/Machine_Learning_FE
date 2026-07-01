import React, {useState} from 'react'
import DatetimePicker from '~pages/models-testing/pages/ModelTestingDiary/components/datetime-picker/DatetimePicker'
import Dropdown from '~pages/models-testing/pages/ModelTestingDiary/components/drop-down/Dropdown'
import './styles.css'
import CustomButton from '~pages/models-testing/components/custom-button/CustomButton'
import CustomTable from '~pages/models-testing/pages/ModelTestingDiary/components/custom-table/CustomTable'
import {HEADERS, useGetQueryTestingData} from './apis/useGetQueryTestingData'
import { string } from 'yup'
import { DataTestingPlaybackItem } from '~shared/types/functions/data'

const ModelTestingDiary = () => {

  // Biến chọn ngày để tìm kiếm
  const [selectedStartDate, setSelectedStartDate] = useState<Date |null>(new Date());
  const [selectedEndDate, setSelectedEndDate] = useState<Date |null>(new Date());

  // Biến chọn options để tìm kiếm
  const optionsStatus = ["Tất cả", "Stable", "Unstable"]
  const optionsNumber = ["Tất cả", 10, 20, 40, 80, 100]

  const [selectedStatus, setSelectedStatus] = useState<string | number>(optionsStatus[0])
  const [selectedNumber, setSelectedNumber] = useState<string | number>(optionsNumber[0])

  // Khai báo API để lấy cơ sở dữ liệu lên
  const getTestingData = useGetQueryTestingData()
  const [queryDataResult, setQueryDataResult] = useState<DataTestingPlaybackItem[] | null>(null)

  const formatDate = (date: Date | null) => {
    if (!date) return null;
    const d = new Date(date);
    const day = String(d.getDate()).padStart(2, "0");
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const year = d.getFullYear();
    return `${day}-${month}-${year}`;
  };


  const status = selectedStatus === "Tất cả" ? null : selectedStatus;

  const number = selectedNumber === "Tất cả" ? 1000 : selectedNumber;

  // Button tìm kiếm
  const [isPressedFindBtn, setIsPressedPredictBtn] = useState<boolean>(false)

  const handleClickFindBtn =  async () => {

    setIsPressedPredictBtn(true);

    const start_date = !selectedStartDate ? new Date() : selectedStartDate;
    const end_date = !selectedEndDate ? new Date() : selectedEndDate;

    if ( start_date > end_date ) {
            alert('⚠️ Ngày bắt đầu phải nhỏ hơn ngày kết thúc!')
    return
    }
    
    setIsShowTable(true);

    const payload = {
      start_date: formatDate(selectedStartDate),
      end_date: formatDate(selectedEndDate),
      prediction: status,
      limit: number  
    }
    console.log("Input:", payload)

    const finalPayload = {
      action: 'query_testing_playback__get_data',
      payload: payload
    }
    try{

      const res = await getTestingData.sendRequest(finalPayload)
      setQueryDataResult(res.data)
      console.log(res)

    } catch (error) {
      console.log("error", error)
    }
  }

  // Button làm mới
  const handleClickResetBtn = () => {
    setIsPressedPredictBtn(false);
    setIsShowTable(false);
    setSelectedStatus(optionsStatus[0]);
    setSelectedNumber(optionsNumber[0]);
    setSelectedStartDate(new Date());
    setSelectedEndDate(new Date());
  }

  // Table
  const [isShowTable, setIsShowTable] = useState<boolean>(false);


  return (
    <div className='diary_testing'>

      <div className='diary_testing-header'>
        <text className='diary_testing_title'>Xem lịch sử thử nghiệm</text>

        <div className="diary_testing_options">
          
          <div className="diary_testing_options_choose_date">

            <div className='col'>
              <text className='diary_testing_title_choose_date'>Ngày bắt đầu:</text>
              <DatetimePicker 
                  selectedDate={selectedStartDate}
                  setSelectedDate={setSelectedStartDate}
              />
            </div>

            <div className='col'>
              <text className='diary_testing_title_choose_date'>Ngày kết thúc:</text>
              <DatetimePicker 
                  selectedDate={selectedEndDate}
                  setSelectedDate={setSelectedEndDate}
              />
            </div>

          </div>

          <Dropdown 
              title="Chọn trạng thái"
              selected={selectedStatus}
              setSelected={setSelectedStatus}
              options={optionsStatus}
          />

          <Dropdown 
              title="Chọn số lượng"
              selected={selectedNumber}
              setSelected={setSelectedNumber}
              options={optionsNumber}
          />

          <CustomButton 
              title='Tìm kiếm'
              isActive={isPressedFindBtn}
              onClick={handleClickFindBtn}
          />

        </div>
      </div>

      {isShowTable &&

      <div className='diary_testing-table'>

        <div className='diary_testing-table-header'>
          <text className='diary_testing_title'>Kết quả tìm kiếm</text>
          <CustomButton 
                title='Làm mới'
                isActive={false}
                onClick={handleClickResetBtn}
          />
        </div>
        <CustomTable 
          headers={HEADERS}
          data={queryDataResult}
        />
      </div>

      }

      
    </div>
  )
}

export default ModelTestingDiary
