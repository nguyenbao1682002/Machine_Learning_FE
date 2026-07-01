import React, { useState} from 'react'
import GenerateExplanation from '../GenerateExplaination'
import SHAPChart from '../shap-chart.tsx/SHAPChart'
import './PredictionResult.css'
import CustomButton  from '../../../../components/custom-button/CustomButton'
import { splitReason } from '~pages/models-testing/components/SplitReason'
import {shapData, stateData, IGetAnomalyDetectData, IAnomalyDetectResponseData, IGetRecommendControlData, IRecommendControlResponseData } from '~shared/types/functions/data'


interface PredictResultProps {
  state: stateData
  predictionResults: IAnomalyDetectResponseData | null
  recommendationResults: IRecommendControlResponseData | null
  onReset: () => void
  onPressedPredictBtn: () => void
}

const PredictionResult: React.FC<PredictResultProps> = ({ state, predictionResults, recommendationResults, onReset, onPressedPredictBtn }) => {
  if (!predictionResults) {
    return <div className='predictionResultContainer'>Nhấn "Dự đoán" để xem kết quả.</div>
  }

  const { prediction, shap_explains} = predictionResults;
  const explanation = GenerateExplanation(shap_explains);

  const { analysis, rule, action} = splitReason(recommendationResults?.recommendation.reason ?? "")
  

  // Handle button làm mới
  const[isActiveResetBtn, setIsActiveResetBtn] = useState<boolean>(false)

  function handleClickReset() {
    setIsActiveResetBtn(!isActiveResetBtn);
    onReset();
    onPressedPredictBtn();
  }

  return (
    <div className='predictionResultContainer'>

      {/* Tiêu đề Kết quả Dự đoán */}
      <div className='headerRow'>
        <h2 className='resultTitle'>Kết quả dự đoán</h2>

        <span className={`predictionLabel ${prediction === 'Unstable' ? 'unstable' : 'stable'}`}>Trạng thái lò: {prediction}</span>

        <CustomButton title='Làm mới' isActive={isActiveResetBtn} onClick={handleClickReset}/>
      </div>

      <div className={prediction === 'Unstable' ? 'unstable_result' : 'stable_result'}>

          {/* Biểu đồ SHAP */}
          <SHAPChart shap={shap_explains} state={state} />

          <div className='explain_box'>

          {/* Cột Giải thích SHAP */}
          <div className='explanantionBox'>
            <h3 className='boxTitle'>Giải thích SHAP values</h3>
            <ul className='explanationList'>
              {explanation.map((item, index) => (
                <li
                  key={index}
                  className={`explanationItem explanationItem-${index + 1}`}
                >
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Cột Đề xuất từ AI Agent */}
          {prediction === 'Unstable' && 

              <div className="proposalBox">
                <h3 className="boxTitle">Đề xuất từ AI Agent</h3>

                  <>
                    <ul className="proposalSuggestionList">
                      <p className="proposalSuggestionList-text">Thông số điều khiển đề xuất:</p>

                      <li className="proposalSuggestionItem">
                        <b>Than (CoalSP):</b> {recommendationResults?.recommendation.CoalSP}
                      </li>
                      <li className="proposalSuggestionItem">
                        <b>Quạt (FanSP):</b> {recommendationResults?.recommendation.FanSP}
                      </li>
                      <li className="proposalSuggestionItem">
                        <b>Tốc độ lò (FurnaceSpeedSP):</b> {recommendationResults?.recommendation.FurnaceSpeedSP}
                      </li>
                      <li className="proposalSuggestionItem">
                        <b>Thời gian chờ (phút):</b> {recommendationResults?.recommendation.wait_min}
                      </li>
                    </ul>

                    {/* Giải thích */}
                  <div className="proposalExplanation">
                    <p className="proposalExplanationTitle">Giải thích:</p>

                    <li className="proposalSuggestionItem">
                      <strong>Phân tích:</strong> {analysis || "—"}
                    </li>
                    <li className="proposalSuggestionItem">
                      <strong>Luật áp dụng:</strong> {rule || "—"}
                    </li>
                    <li className="proposalSuggestionItem">
                      <strong>Hành động:</strong> {action || "—"}
                    </li>
                  </div>

                  </>
              </div>

          }
        </div>
    </div>

    </div>
  )
}

export default PredictionResult
