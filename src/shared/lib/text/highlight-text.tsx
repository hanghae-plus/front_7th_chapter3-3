import { ReactNode } from "react"

/**
 * 텍스트에서 검색어를 하이라이트합니다.
 * @param text - 원본 텍스트
 * @param query - 검색어 (대소문자 구분 없음)
 * @returns 하이라이트된 JSX 또는 null
 * @example
 * highlightText("Hello World", "world")
 * // => <span>Hello <mark>World</mark></span>
 */
export const highlightText = (text: string, query: string): ReactNode => {
  if (!text) return null
  if (!query.trim()) {
    return <span>{text}</span>
  }

  const regex = new RegExp(`(${query})`, "gi")
  const parts = text.split(regex)

  return (
    <span>
      {parts.map((part, i) =>
        regex.test(part) ? (
          <mark key={i} className="bg-yellow-200">
            {part}
          </mark>
        ) : (
          <span key={i}>{part}</span>
        ),
      )}
    </span>
  )
}
