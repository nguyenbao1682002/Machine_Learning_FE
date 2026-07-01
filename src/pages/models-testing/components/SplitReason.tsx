export function splitReason(reason: string) {
  if (!reason) return { analysis: "", rule: "", action: "" };

    {reason
    ?.split("|")
    .map((part, idx) => (
    <p
        key={idx}
        dangerouslySetInnerHTML={{
        __html: part
            .trim()
            .replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>") // bold **...**
        }}
    />
    ))}

  // Regex tách theo các cụm từ khóa
  const match = reason.match(
    /PHÂN TÍCH:\s*(.*?)\s*LUẬT ÁP DỤNG:\s*(.*?)\s*HÀNH ĐỘNG:\s*(.*)/s
  );

  if (!match) {
    // fallback nếu chuỗi không đúng format
    return { analysis: reason, rule: "", action: "" };
  }

  return {
    analysis: match[1].trim(),
    rule: match[2].trim(),
    action: match[3].trim(),
  };
}