/**
 * 텍스트 유틸리티 함수
 * 
 * 텍스트 하이라이트 등 텍스트 처리 유틸리티
 */

/**
 * 텍스트에서 특정 문자열을 하이라이트 처리
 * @param text 원본 텍스트
 * @param highlight 하이라이트할 문자열
 * @returns 하이라이트된 JSX 요소
 */
export function highlightText(text: string, highlight: string) {
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

