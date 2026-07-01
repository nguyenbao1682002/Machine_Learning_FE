import React, { useMemo } from "react";
import "./SHAPChart.css";
import { shapData, stateData } from "~shared/types/functions/data";

interface SHAPChartProps {
  shap: shapData;
  state: stateData;
}

interface ParsedSHAP {
  feature: string;
  contribution: number;
  value?: number | string;
}

const SHAPChart: React.FC<SHAPChartProps> = ({ shap, state }) => {
  // Parse dữ liệu shap object -> mảng [{ feature, contribution, value }]
  const data: ParsedSHAP[] = useMemo(() => {
    if (!shap) return [];

    // Lấy 6 biến chính (vì shap chỉ có 6)
    const keys = [
      "Pyrometer",
      "KilnDriAmp",
      "KilnInletTemp",
      "GA01_Oxi",
      "GA02_Oxi",
      "GA03_Oxi",
    ] as (keyof shapData)[];

    return keys.map((key) => ({
      feature: key,
      contribution: shap[key] ?? 0,
      value: state[key] ?? "—",
    }));
  }, [shap, state]);

  // Tính range min / max
  const { X_MIN, X_MAX } = useMemo(() => {
    if (data.length === 0) return { X_MIN: -1, X_MAX: 1 };
    const values = data.map((d) => d.contribution);
    const minVal = Math.min(...values);
    const maxVal = Math.max(...values);
    const bound = Math.max(Math.abs(minVal), Math.abs(maxVal));
    const padding = bound * 0.1;
    return {
      X_MIN: Math.floor(-bound - padding),
      X_MAX: Math.ceil(bound + padding),
    };
  }, [data]);

  const X_RANGE = X_MAX - X_MIN;
  const baseCenter = ((0 - X_MIN) / X_RANGE) * 100;

  // Sinh nhãn trục X
  const xLabels = useMemo(() => {
    const step = X_RANGE / 8;
    const arr: number[] = [];
    for (let x = X_MIN; x <= X_MAX + 0.0001; x += step) {
      arr.push(Number(x.toFixed(2)));
    }
    return arr;
  }, [X_MIN, X_MAX, X_RANGE]);

  // Map feature -> label tiếng Việt
  const LABELS: Record<string, string> = {
    Pyrometer: "Pyrometer (°C)",
    KilnDriAmp: "Tải lò (A)",
    KilnInletTemp: "Nhiệt đầu lò (°C)",
    GA01_Oxi: "O₂ đầu lò (%)",
    GA02_Oxi: "O₂ sau tháp 2 (%)",
    GA03_Oxi: "O₂ sau tháp 3 (%)",
  };

  return (
    <div className="shapChartContainer">
      <h3 className="shapTitle">Giải thích SHAP (6 biến chính)</h3>

      <div className="chartArea">
        <div className="barList">
          {data.map((item, index) => {
            const isPositive = item.contribution >= 0;
            const widthPercent = (Math.abs(item.contribution) / X_RANGE) * 100;

            return (
              <div key={index} className="barRow">
                {/* Tên + giá trị state */}
                <span className="featureLabel">
                  {LABELS[item.feature] || item.feature} ={" "}
                  <b>{item.value ?? "—"}</b>
                </span>

                <div className="barTrack">
                  <div
                    className={`shapBar ${isPositive ? "positive" : "negative"}`}
                    style={{
                      width: `${widthPercent}%`,
                      left: `${baseCenter}%`,
                      transform: isPositive
                        ? "translateX(0)"
                        : "translateX(-100%)",
                    }}
                  >
                    <span
                      className={`contributionValue ${
                        isPositive ? "positive" : "negative"
                      }`}
                    >
                      {item.contribution > 0
                        ? `+${item.contribution.toFixed(3)}`
                        : item.contribution.toFixed(3)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Trục X */}
        <div className="xAxis">
          {xLabels.map((val, i) => {
            const leftPos = ((val - X_MIN) / X_RANGE) * 100;
            return (
              <div key={i} className="xMark" style={{ left: `${leftPos}%` }}>
                <span className="xLabel">{val}</span>
                <div className="xGridLine" />
              </div>
            );
          })}
          <div className="baseLine" style={{ left: `${baseCenter}%` }} />
        </div>
      </div>

      <div className="xTitle">
        Biểu đồ: Giải thích ảnh hưởng của từng biến (SHAP Explainer)
      </div>
    </div>
  );
};

export default SHAPChart;
