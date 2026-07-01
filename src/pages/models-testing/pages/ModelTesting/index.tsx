import { useCallback, useState, useMemo } from 'react'
import ConfigPopup from '~pages/models-testing/pages/ModelTesting/components/ConfigPopup'
import ParamControlRow from '~pages/models-testing/pages/ModelTesting/components/ParamControlRow'
import { PARAM_CONFIGS, ParamConfig, ParamKey} from '~pages/models-testing/types'
import CustomButton from '~pages/models-testing/components/custom-button/CustomButton'
import PredictionResult from '~pages/models-testing/pages/ModelTesting/components/prediction-result/PredictionResult'
import PopupLoading from '~pages/models-testing/pages/ModelTesting/components/popup-loading/PopupLoading'
import { useGetPredictionModel } from './apis/usePredictionModel'
import './styles.css'
import { useGetRecommendModel } from './apis/useRecommendationModel'
import { usePostTestingData } from './apis/usePostTestingData'
import { IAnomalyDetectResponseData, IRecommendControlResponseData} from '~shared/types/functions/data'

export default function ModelTesting() {

  // STATE CONFIGURATION: Lưu trữ CẤU HÌNH (bao gồm ngưỡng) có thể thay đổi
  const [configState, setConfigState] = useState<Record<ParamKey, ParamConfig>>(() => PARAM_CONFIGS)

  // STATE VALUE: Lưu trữ giá trị hiện tại của các tham số
  const [params, setParams] = useState(() => Object.entries(configState).reduce((acc, [key, config]) => {
      acc[key as ParamKey] = config.initialValue
      return acc
    }, {} as Record<ParamKey, number>),
  )

  // STATE POPUP: Quản lý thông số đang được chỉnh sửa
  const [editingParam, setEditingParam] = useState<ParamKey | null>(null)

  // Hàm cập nhật giá trị thanh trượt
  const handleParamChange = useCallback((key: ParamKey, newValue: number) => {
    setParams((prev) => ({
      ...prev,
      [key]: newValue,
    }))
  }, [])

  // Hàm lưu ngưỡng cấu hình mới
  const handleSaveBoundary = useCallback((key: ParamKey, newLow: number, newHigh: number) => {
    setConfigState((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        boundaryLow: newLow,
        boundaryHigh: newHigh,
      },
    }))
  }, [])

  // Logic chia cột
  const paramKeys = Object.keys(configState) as ParamKey[]
  const column1Keys = paramKeys.slice(0, 4)
  const column2Keys = paramKeys.slice(4, 8)

  // Kết quả dự đoán
  const predictionPayload = useMemo(() => {
    return {
      action : 'anomaly_detect__get_data',
      payload: {
        state: params
      },
    }
  }, [{state: params}])

  const recommendationPayload = useMemo(() => {
    return {
      action : 'recommend_control__get_data',
      payload: {
        state: params
      },
    }
  }, [{state: params}])
    
  const predictionModel = useGetPredictionModel()
  const recommendationModel = useGetRecommendModel()
  const postTestingData = usePostTestingData()
  const [ predictionData, setPredictionData ] = useState<IAnomalyDetectResponseData | null>(null)
  const [recommendationResult, setRecommendationResult] = useState<IRecommendControlResponseData | null>(null)

  // Handle Button khi nhất dự đoán
  const [isPressedPredictBtn, setIsPressedPredictBtn] = useState<boolean>(false)
  const [isLoading, setIsLoading] = useState(false)

  const handlePredict = async () => {
    setIsLoading(true) // 🔹 Hiện popup khi bắt đầu

    try {

      // Gọi prediction model
      const predictionResponse = await predictionModel.sendRequest(predictionPayload)
      console.log("State", params)
      console.log("🔹 Prediction Response:", predictionResponse)
      setPredictionData(predictionResponse)
      setIsPressedPredictBtn(true)

      let recommendation = {
          CoalSP: "0",
          FanSP: "0",
          FurnaceSpeedSP: "0",
          wait_min: 0,
          reason: "Lò nung hoạt động ổn định, không cần điều chỉnh."
      }


      // Nếu kết quả là Unstable thì gọi tiếp recommendation Model
      if (predictionResponse?.prediction === "Unstable") {

        const recommendationResponse = await recommendationModel.sendRequest(recommendationPayload)
        setRecommendationResult(recommendationResponse)
        recommendation = recommendationResponse?.recommendation;

      } else {
        setRecommendationResult(null)
      }

      // Ghi xuống DynamoDB
      const payloadPostData = {
          state: params,
          prediction: predictionResponse?.prediction,
          shap_explains: predictionResponse?.shap_explains,
          recommendation: recommendation
      }
        
      const finalPayloadPostData = {
        action: 'post_testing_playback__get_data',
        payload: payloadPostData
      }

      const resPostData = await postTestingData.sendRequest(finalPayloadPostData)

      console.log("Ghi xuống database: ", resPostData)

    } catch (error) {
      console.error("Lỗi khi gọi API:", error)
    } finally {
      setIsLoading(false)
    }

  }

  // Handle Reset
  const HandleReset = () => {
    setPredictionData(null);
    setRecommendationResult(null);
  }

  return (
    <div className='model-testing-container'>
      <div className='config-parameter-area'>
        <h2 className='title'>Thông số trạng thái thử nghiệm</h2>
        <div className='gridContainer'>
          {/* Cột Trái */}
          <div className='gridItem'>
            {column1Keys.map((key) => (
              <ParamControlRow
                key={key}
                paramKey={key}
                config={configState[key]} // Truyền config từ state
                value={params[key]} // Truyền giá trị từ state
                onChange={(v) => handleParamChange(key, v)}
                onConfigClick={setEditingParam} // Truyền hàm mở popup
              />
            ))}
          </div>

          {/* Cột Phải */}
          <div className='gridItem'>
            {column2Keys.map((key) => (
              <ParamControlRow
                key={key}
                paramKey={key}
                config={configState[key]} // Truyền config từ state
                value={params[key]} // Truyền giá trị từ state
                onChange={(v) => handleParamChange(key, v)}
                onConfigClick={setEditingParam} // Truyền hàm mở popup
              />
            ))}
          </div>
        </div>

        {/* Button dự đoán */}
        <div className='predictButton'>
          <CustomButton 
             title='Dự đoán'
             isActive={isPressedPredictBtn}
             onClick={handlePredict}
          />
        </div>
      </div>
      
      {isLoading && <PopupLoading message="AI Agent đang tính toán..." />}
      {!isLoading && 
        <div className='prediction-result-area'>
          <PredictionResult 
            state={params}
            predictionResults={predictionData}
            recommendationResults={recommendationResult}
            onReset={HandleReset} 
            onPressedPredictBtn = {() => setIsPressedPredictBtn(false)}
          />
        </div>
      }
      
      {/* POPUP CONFIG */}
      {editingParam && <ConfigPopup config={configState[editingParam]} paramKey={editingParam} onClose={() => setEditingParam(null)} onSave={handleSaveBoundary} />}
    </div>
  )
}
