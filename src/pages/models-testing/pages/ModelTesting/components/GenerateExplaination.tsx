// generateExplanation.ts

/**
 * Sinh chuỗi giải thích tự động từ SHAP values
 * @param shapExplains object { featureName: shapValue }
 * @returns string[] gồm 3 đoạn mô tả
 */
export function generateExplanation(
  shapExplains: {
    Pyrometer: number
    KilnDriAmp: number
    KilnInletTemp: number
    GA01_Oxi: number
    GA02_Oxi: number
    GA03_Oxi: number
    CO?: number
    NOx?: number
  }
): string[] {
  const line1 =
    'Giá trị SHAP thể hiện mức độ đóng góp của từng biến đầu vào đến trạng thái bất thường của hệ thống: ' +
    'giá trị càng lớn (về độ lớn tuyệt đối) thì biến đó càng ảnh hưởng mạnh.';

  // Map key sang label tiếng Việt
  const LABELS: Record<string, string> = {
    Pyrometer: 'Nhiệt độ Pyrometer',
    KilnInletTemp: 'Nhiệt đầu vào lò',
    KilnDriAmp: 'Tải lò (A)',
    GA01_Oxi: 'O₂ đầu lò',
    GA02_Oxi: 'O₂ sau tháp 2',
    GA03_Oxi: 'O₂ sau tháp 3',
    // CO: 'CO khí thải',
    // NOx: 'NOx khí thải',
  };

  // Chuyển object shapExplains thành mảng [{ feature, contribution }]
  const shapValues = Object.entries(shapExplains).map(([feature, value]) => ({
    feature,
    contribution: value,
  }));

  // Lọc các biến có đóng góp dương (ảnh hưởng bất ổn)
  const positiveVars = shapValues
    .filter((s) => s.contribution > 0)
    .map((s) => LABELS[s.feature] ?? s.feature);

  // Lọc các biến có đóng góp âm (ổn định)
  const negativeVars = shapValues
    .filter((s) => s.contribution < 0)
    .map((s) => LABELS[s.feature] ?? s.feature);

  // Sinh mô tả
  const line2 =
    positiveVars.length > 0
      ? `Các biến có đóng góp dương (ảnh hưởng làm hệ thống bất ổn) gồm: ${positiveVars.join(', ')}.`
      : 'Không có biến nào có đóng góp dương (bất thường).';

  const line3 =
    negativeVars.length > 0
      ? `Các biến có đóng góp âm (ổn định hoặc giảm rủi ro) gồm: ${negativeVars.join(', ')}.`
      : 'Không có biến nào có đóng góp âm (ổn định).';

  return [line1, line2, line3];
}

export default generateExplanation;
