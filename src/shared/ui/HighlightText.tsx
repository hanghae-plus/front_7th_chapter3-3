interface HighlightTextProps {
  text?: string
  highlight: string
}
// 하이라이트 함수 추가 -> JSX를 반환하여 컴포넌트로 변경
export const HighlightText = ({ text, highlight }: HighlightTextProps) => {
  if (!text) return null
  if (!highlight.trim()) {
    return <span>{text}</span>
  }
  const regex = new RegExp(`(${highlight})`, "gi")
  const parts = text.split(regex)
  return (
    <span>
      {parts.map((part, i) => (regex.test(part) ? <mark key={i}>{part}</mark> : <span key={i}>{part}</span>))}
    </span>
  )
}
