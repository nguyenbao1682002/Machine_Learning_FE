import React from "react";
import "./CustomTable.css";
import { DataTestingPlaybackItem } from '~shared/types/functions/data'
import { splitReason } from "~pages/models-testing/components/SplitReason";

interface CustomTableProps {
  headers: string[];
  data:  DataTestingPlaybackItem[] | null;
}

const CustomTable: React.FC<CustomTableProps> = ({ headers, data }) => {

  if (!data) {
    return (
      <p>Không có dữ liệu</p>
    )
  }
  // Sort giảm dần theo thời gian (mới nhất → cũ nhất)
  const sortedData = [...data].sort((a, b) => {
    const parseDate = (str: string) => {
      // "14-10-2025 19:30:19" -> Date object
      const [day, month, yearAndTime] = str.split("-");
      const [year, time] = yearAndTime.split(" ");
      return new Date(`${year}-${month}-${day}T${time}`);
    };
    return parseDate(b.DateTime).getTime() - parseDate(a.DateTime).getTime();
  });


  return (
    <div className="table-container">
      <table className="custom-table">
        <thead>
          <tr>
            {headers.map((header, idx) => (
              <th key={idx}>{header}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {(!sortedData || sortedData.length === 0) ? (
            <tr>
              <td colSpan={headers.length} className="no-data">
                Không có dữ liệu
              </td>
            </tr>
          ) : (
            sortedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {/* Thời gian */}
                <td className="col-time">{row.DateTime}</td>

                {/* Trạng thái */}
                <td className="col-state">
                  {Object.entries(row.state).map(([key, val]) => (
                    <div key={key}>
                      <strong>{key}</strong>: {val}
                    </div>
                  ))}
                </td>

                {/* Dự đoán */}
                <td className="col-predict">
                  <strong
                    className={
                      row.prediction === "Stable"
                        ? "predict-stable"
                        : "predict-unstable"
                    }
                  >
                    {row.prediction === "Stable" ? "Ổn định" : "Không ổn định"}
                  </strong>
                </td>

                {/* SHAP */}
                <td className="col-shap">
                  {Object.entries(row.shap_explains).map(([key, val]) => (
                    <div key={key}>
                      <strong>{key}</strong>: {val.toFixed(3)}
                    </div>
                  ))}
                </td>

                {/* Đề xuất */}
                <td className="col-recommend">
                  <div><b>Than (CoalSP):</b> {row.recommendation.CoalSP}</div>
                  <div><b>Quạt (FanSP):</b> {row.recommendation.FanSP}</div>
                  <div><b>Tốc độ lò:</b> {row.recommendation.FurnaceSpeedSP}</div>
                  <div><b>Chờ:</b> {row.recommendation.wait_min} phút</div>
                </td>

                {/* Giải thích */}

                <td className="col-explain">
                {row.prediction === "Stable" ? (
                  // Nếu trạng thái ổn định → hiển thị nguyên reason
                  <p>{row.recommendation.reason}</p>
                ) : (
                  // Nếu không ổn định → tách 3 phần
                  (() => {
                    const { analysis, rule, action } = splitReason(row.recommendation.reason ?? "");
                    return (
                      <div className="reasonBox">
                        <p><strong>Phân tích:</strong> {analysis || "—"}</p>
                        <p><strong>Luật áp dụng:</strong> {rule || "—"}</p>
                        <p><strong>Hành động:</strong> {action || "—"}</p>
                      </div>
                    );
                  })()
                )}
              </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomTable;